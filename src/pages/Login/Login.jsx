import React, { useContext } from 'react'
import * as zod from'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { Axios } from 'axios';
import { useForm } from 'react-hook-form'
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import TokenCont from '../../component/Token/TokenProvider.Context';
import useLoadingBtn from '../../hook/loadingbutton/useLoadingBtn';
import { SyncLoader } from 'react-spinners';

export default function Login() {
  const[BtnLoading,BtnIsLoading,BtnLoaded]=useLoadingBtn();
  console.log("testing the is loading hook ",BtnLoading)
  const navigate =useNavigate();
  const {Token,SetToken}=useContext(TokenCont);
  const schema =zod.object({
  
  email:zod.string().email("Email must be valid email "),
password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"The password should be more than 8 letters with at least one lowercase letter ,on uppercase and a special character "),
})
  
  const {handleSubmit,register,formState,setError}=useForm(
      {
        defaultValues:{
      "email":"",    
      "password":"",
      resolver:zodResolver(schema),
      
      }
    }
    );
  ;  
   async function passingToAPI(datas)
  {
     console.log(datas);
      const options={
        method:"POST",
        url:"https://linked-posts.routemisr.com/users/signin",
        data:datas
      }
    const loader =toast.loading("Signing u in hang tightly ....🥭🥭🥭");
    try{
      BtnIsLoading();
      const request=await axios.request(options);
      console.log(request.data);
      localStorage.setItem('token',request.data.token);
      SetToken(request.data.token);
        toast.success("User Login succesuflly🥭")
   
      ////////! i will call function that excute some logic when the user log in  
          
         


        navigate('/Home')
    
        

    }
    catch(error)
    {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
    finally
    {
      toast.dismiss(loader);
    }
    
    
  }
  return ( <>
  <Toaster className=" text-amber-500 sm:text-2xl font-sans font-bold" position="top-center" reverseOrder={false} />
    <div className="formcontainer bg-amber-50 m-auto  rounded-4xl py-6 px-32  my-12">  <form onSubmit={handleSubmit(passingToAPI)}>

      <div className="email space-y-5">
        <label className='formLabel ' htmlFor='email'> Email:</label>
        <input className='formInput' id='email' {...register('email')} type="text" />
        {formState.dirtyFields.email&&formState.errors.email&&<p className='errorMessage'>{formState.errors.email.message}</p>}
      </div>
      <div className="password space-y-5">
        <label className='formLabel ' htmlFor='password'> Password:</label>
        <input className='formInput'  type="password" {...register('password')} id='password' />
         {formState.dirtyFields.password&&formState.errors?.password&&<p className='errorMessage'>{formState.errors.password?.message}</p>}
      </div>
           <div className='flex justify-between items-baseline   px-3 mt-10'>
<div className="btn"><button className='botn'  disable={BtnIsLoading}>{BtnLoading?<SyncLoader color="#ffcc24a0" />:"Sign in"}</button></div>
    
     <div className='font-bold  text-2xl text-amber-500 ps-2 pb-4 '>Already have an account?<Link to={'/'} ><span className='underline block hover:scale-125 transform transition-all duration-300 ml-2'>Sign up</span></Link></div>
      </div>
      </form>
      </div>
    </>
  )}
