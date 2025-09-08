import { QueryClient, queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useRef, useState } from 'react'
import TokenCont from '../../component/Token/TokenProvider.Context'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Posts from '../../component/Posts/posts';
import 'react-loading-skeleton/dist/skeleton.css'
import PostSkeleton from '../../component/Post skeleton/post skeleton';
import { Helmet } from 'react-helmet';
import UseUserInfo from '../../hook/userInfo/useUserInfo';
import { useForm } from 'react-hook-form';
import * as Zod from'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
export default function Profile() {
  const {Id,Token}=useContext(TokenCont);
  const[reset,Setreset]=useState(false)
  const[profileImagepreview,setprofileImagePreview] =useState(null)
  const profileImage=useRef();
  const querClient=useQueryClient();
  



    //////!function and mutation to upload the profile photo

    function APiProfileUpdate()
    {
      const uplodedphotoForm=new FormData()
        uplodedphotoForm.append("photo",profileImage.current?.files[0])
      const options= {

        method:"PUT",
        url:"https://linked-posts.routemisr.com/users/upload-photo",
        headers:{
          token:Token,
        },
        data:uplodedphotoForm,
      }
      const request=axios.request(options)
      console.log("rad 2el upload photo Api ", request)
      return request

    }
 

    const{mutate:profilemutate}=useMutation(
      {
        mutationKey:["update profile"],
        mutationFn:APiProfileUpdate,
        onMutate:()=>{toast.loading("ur beauty is being uploaded to our server....🥭🥭🥭",{id:"uploading"})},
        onSuccess:()=>{toast.success("our server is decorated now with ur photo🥭")
          
          querClient.invalidateQueries(["profile user data"])
        },
        onError:(err)=>{toast.error(err.response.data.error)
          console.log(err.response.data.error)
        },
        onSettled:()=>{toast.dismiss("uploading")},
        }
      
    )













  ////!react form to control the input password


      const schema= Zod.object(
        {
          password:Zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"The password should be more than 8 letters with at least one lowercase letter ,on uppercase and a special character "),
          newPassword:Zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"The password should be more than 8 letters with at least one lowercase letter ,on uppercase and a special character "),
        }
      )


  const {register,handleSubmit,formState}=useForm(
    {
      defaultValues:{
        "password":"",
        "newPassword":"",
        
      },
      resolver:zodResolver(schema)
    }
  )
      ///passing new password data to api
      
   function resetPassword(values)
   {
    const options ={
      method:"PATCH",
      url:"https://linked-posts.routemisr.com/users/change-password",
      data:values,
      headers:{
        token:Token,
      }
    }
    return  axios.request(options);
    
   } 
      

   const mutate= useMutation(
    {
      mutationKey:["reset password"],
      mutationFn:resetPassword,
      onMutate:()=>{toast.loading("ur things is being collected...🥭🥭🥭",{id:"reset"})},
      onSuccess:()=>{toast.success("ur password is changed do not forget it again 🥭")
        Setreset(false)
      },
      onError:(error)=>{toast.error(error.response.data.error)
        // console.log(error)
      },
      onSettled:()=>{toast.dismiss("reset")}
    }
   )

    
       







  async function profieApirequest()
  {
    const option ={
      method:"GET",
      url:`https://linked-posts.routemisr.com/users/${Id.user}/posts`,
      headers:{
        token:Token,
      }
    }
    const request = await  axios.request(option);
    // console.log(Id);
    return request
  }

  const {data,error ,isLoading,isFetching,isError,}= useQuery({
    queryKey:["profile posts",Id],
    queryFn:profieApirequest,
    enabled:!!Id.user
    
  })

  
  
  
  
  

  const[datauser,erroruser,isLoadingUser]=UseUserInfo(Token,Id);



  
  
  return (<>
        <Helmet>
    
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mango|Profile|{datauser?datauser.data.user.name:''}</title>
  
      </Helmet>
  {isLoading ||isLoadingUser ? <PostSkeleton count={10}></PostSkeleton>:data? <>


  <div className="useredit m-auto  bg-[#fcec985b]  space-y-5 rounded-3xl py-4 w-[60%] mt-5 flex">
    <div className="userphoto"> <img className='w-1/2 rounded-4xl' src={datauser.data.user.photo} alt="" /></div>
    <div className="userdata">
    <div className="userName"> <p className='postText'><span className='text-2xl font-extrabold'>UserName :</span>{datauser.data.user.name}</p></div>
    <div className="userName"> <p className='postText'><span className='text-2xl font-extrabold'>Useremail :</span>{datauser.data.user.email}</p></div>
    <div className="userBirthday"><p className='postText'><span className='text-2xl font-extrabold'>UserBirthday :</span>{datauser.data.user.dateOfBirth}</p></div>
    <div className="userid"><p className='postText'><span className='text-2xl font-extrabold'>UserId :</span>{datauser.data.user._id}</p></div>
    <form className={`space-y-1.5 ${reset?"":"hidden"} `} onSubmit={handleSubmit(function onsubmit(Values){mutate.mutate(Values)})}>
      <label className='formLabel' htmlFor="">Current Password</label>
      <input className='formInput'  type='password' {...register('password')}></input>
      {formState.dirtyFields.password&&formState.errors?.password&&<p className='errorMessage'>{formState.errors.password?.message}</p>}
      <label className='formLabel' htmlFor="" >New Password</label>
      <input className='formInput' type='password' {...register('newPassword')}></input>
      {formState.dirtyFields.newPassword&&formState.errors?.newPassword&&<p className='errorMessage'>{formState.errors.newPassword?.message}</p>}
    <button className='botn' > ResetPassword</button>
    </form>
     <button className={`botn ${reset?"hidden":""}`} onClick={()=>{Setreset(true)}}> ResetPassword</button>
     <div className="updateprofilephoto">
      <div className="uplodedPhotoPreview rounded-4xl w-full bg-amber-300 my-5"><img src={profileImagepreview} alt="" className='rounded-4xl w-full'  /></div>
<label>
  <svg className="hover:cursor-pointer hover:scale-150" xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none">
  <g clipPath="url(#clip0_4418_3153)">
    <path d="M9 6C7.9 6 7 6.9 7 8C7 9.1 7.9 10 9 10C10.1 10 11 9.1 11 8" stroke="#fe9a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12.99V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10" stroke="#fe9a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 2H9C4 2 2 4 2 9" stroke="#fe9a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.75 5H21.25" stroke="#fe9a00" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18.5 7.75V2.25" stroke="#fe9a00" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.66992 18.9496L7.59992 15.6396C8.38992 15.1096 9.52992 15.1696 10.2399 15.7796L10.5699 16.0696C11.3499 16.7396 12.6099 16.7396 13.3899 16.0696L17.5499 12.4996C18.3299 11.8296 19.5899 11.8296 20.3699 12.4996L21.9999 13.8996" stroke="#fe9a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_4418_3153">
      <rect width={24} height={24} fill="white" />
    </clipPath>
  </defs>
</svg>

            <input hidden ref={profileImage}  onChange={()=>{console.log(profileImage.current.files[0]);
              setprofileImagePreview(URL.createObjectURL (profileImage.current.files[0]));
           
            }} className='' type='file'></input></label>
     
     </div>
     <button className="botn" onClick={profilemutate}>Uplode Profile Photo</button>

    </div>

  </div>




  <Posts posts={data.data.posts}loggedInUser={datauser} ></Posts></>:<></>}
  

  
  
  </>
  )
}
