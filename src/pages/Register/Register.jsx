import { zodResolver } from '@hookform/resolvers/zod';
import axios, { Axios } from 'axios';
import { Lollipop } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as zod from'zod';
import toast, { Toaster } from 'react-hot-toast';
import useLoadingBtn from '../../hook/loadingbutton/useLoadingBtn';
import { SyncLoader } from 'react-spinners';


////////!navigate

////////!Scheme desgining
const schema =zod.object({
  name: zod.string("The name sgould be string").min(3,'The name should be at least 3 letters').max(15,"The name shold be at max 10 letters"),
  email:zod.string().email("Email must be valid email "),
  password:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"The password should be more than 8 letters with at least one lowercase letter ,on uppercase and a special character "),
  rePassword:zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"The password should be more than 8 letters with at least one lowercase letter ,on uppercase and a special character "),
  dateOfBirth:zod.date().refine((value)=>{
  if((new Date().getFullYear()-value.getFullYear())>18)
    return true;
  else
    return false;
},{message:'U should be +18 to be able to create account'}),
gender:zod.enum(["male","female"], "Please choose ur gender")
}).refine((value)=>{
  if(value.password!=value.rePassword)
    return false;  
  else  
    return true ;
},{message:"Mismatch , please make sure u reinput the password correctly  ",
  path:['rePassword']
})


export default function Register() {
  const[BtnLoading,BtnIsLoading,BtnLoaded]=useLoadingBtn();
  const navigate =useNavigate()
  const {handleSubmit,register,formState,setError}=useForm(
    {
      defaultValues:{"name": "",
    "email":"",    
    "password":"",
    "rePassword":"",
    "dateOfBirth":"",
    "gender":""},
    resolver:zodResolver(schema),
    
    }
  );  






  ////////!This is the function responsable to contact api 
  
   async function passingToAPI(datas)
  {
     console.log(datas);
      const options={
        method:"POST",
        url:"https://linked-posts.routemisr.com/users/signup",
        data:datas
      }
    const loader =toast.loading("Signing u up hang tightly ....🥭🥭🥭");
    try{
      BtnIsLoading();
      const request=await axios.request(options);
      console.log(request.data.message);
        toast.success("User created succesuflly🥭");
        navigate('/login');
        
    
        

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
 


  return (
    <>
     <Toaster className=" text-amber-500 sm:text-2xl font-sans font-bold" position="top-center" reverseOrder={false} />
    <div className="formcontainer bg-amber-50 m-auto  rounded-4xl py-6 px-32  my-12">  <form onSubmit={handleSubmit(passingToAPI)}>
      <div className="name space-y-5">
        <label className='formLabel' htmlFor='name'> Name:</label>
        <input className='formInput ' id='name'  type="text" {...register('name')} />
        { formState.errors?.name&&<p className='errorMessage'>{formState.errors.name?.message} </p>}

      </div>
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
      <div className="repassword space-y-5">
        <label className='formLabel ' htmlFor='repassword'> Repassword:</label>
        <input className='formInput ' id='repassword' {...register('rePassword',)}  type="password" />
        {formState.dirtyFields.rePassword&&formState.errors.rePassword&&<p className='errorMessage'>{formState.errors.rePassword.message}</p>}
      </div>
      <div className="Date space-y-5">
        <label className='formLabel mt-5 ' htmlFor='date'> Date:</label>
        <input className='formInput' id='date'  type="date" {...register('dateOfBirth',{valueAsDate:true})} />
        {formState.dirtyFields.dateOfBirth&&formState.errors.dateOfBirth&&<p className='errorMessage'>{formState.errors.dateOfBirth.message}</p>}
      <div className="gender space-y-5">
        <label className='formLabel '> Male:</label>
        <input className='gender'  type="radio"  name='gender' value='male' {...register('gender')}/>
        <br />
        <label className='formLabel'> Female:</label>
        <input className='gender'  type="radio" name='gender' value='female' {...register('gender')} />
        {formState.errors?.date&&<p className='errorMessage'>{formState.errors.gender.message}</p>}
      
      </div>
      </div>

      <div className='flex justify-between items-baseline   px-3 mt-10'>
<div className="btn"><button className='botn'  disabled={BtnLoading}>{BtnLoading?<SyncLoader color="#ffcc24a0" />:"Submit"} </button></div>
    
     <div className='font-bold  text-2xl text-amber-500 ps-2 pb-4 '>Already have an account?<Link to={'/Login'} ><span className='underline block hover:scale-125 transform transition-all duration-300 ml-2'>Signin</span></Link></div>
      </div>
    </form>
    </div>
  
    
    </>
  )
}
