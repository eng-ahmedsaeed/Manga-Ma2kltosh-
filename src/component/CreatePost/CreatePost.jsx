import React, { useContext, useRef, useState } from 'react'


import TokenCont from '../Token/TokenProvider.Context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import useLoadingBtn from '../../hook/loadingbutton/useLoadingBtn';
import { SyncLoader } from 'react-spinners';
export default function CreatPost() {
  const[BtnLoading,BtnIsLoading,BtnLoaded]=useLoadingBtn();
const {Token}=useContext(TokenCont)
    ///state to open the input Fields
    const[posting,SetPosting]=useState(false);
    const[image,SetImage]=useState(null);

    const inputPostxt= useRef(null);
    const inputPostImage= useRef(null);
    const querClient=useQueryClient();
   

function Imagehandle()
{
    SetImage(URL.createObjectURL(inputPostImage.current.files[0]) )
}
function ImagClose()
{
    SetImage("")
    inputPostImage.current.value=null
}


async function ApiPosting()
{   
    console.log(inputPostxt.current.value);
    console.log(inputPostImage.current.files[0]);
         const myform = new FormData();
       if(inputPostxt.current.value)
       {

           myform.append("body",inputPostxt.current.value);
       }
    if( inputPostImage.current.files[0])
    {

        myform.append("image",inputPostImage.current.files[0]);
    }
 

   const options={
        method:"POST",
        url:"https://linked-posts.routemisr.com/posts",
        data:myform,
   headers: {
  token: Token
}
}



    const request= await axios.request(options)
    console.log(request);
    return request;
    
}






const {mutate}=useMutation({
    mutationKey:["Posting"],
    mutationFn:ApiPosting,
    onMutate:()=>{ toast.loading("Ur seed is being planted..🌱🌱🌱",{id:'load'})
    BtnIsLoading();
  },
    onSuccess:(res)=>{
        toast.success("ur mango seed is planted ... 🥭🥭🥭")
        console.log(res)
        inputPostImage.current.value=null
        inputPostxt.current.value=""
          SetImage("")
          querClient.invalidateQueries(["GetAllPosts"])
        
    },
    onError:(err)=>{
        toast.error(err.message)
        console.log(err)
      },
      onSettled:()=>{toast.dismiss('load')


        BtnLoaded();
      }
})






  return (
    <div className=' bg-[#fcec985b] postcontainer rounded-3xl p-5 space-y-4'>
        <input className='formInput'  onFocus={()=>{SetPosting(true)}} hidden={posting}></input> 
        <div className="inputsfields"  hidden={!posting}>
 <input className='formInput' ref={inputPostxt}></input>
        <div className="imgContainer m-auto flex justify-center relative ">
            <button onClick={ImagClose}>
       {image?  <svg className='absolute right-3 top-3' xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_4418_3721)">
                <path d="M13.9902 10.0099L14.8302 9.16992" stroke="#fe9a00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.16992 14.8301L11.9199 12.0801" stroke="#fe9a00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.8299 14.8299L9.16992 9.16992" stroke="#fe9a00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85" stroke="#fe9a00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                <clipPath id="clip0_4418_3721">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>:""}
            </button>
   
            <img className='' src={image} alt="" /></div> 
            <div className="createPostControls flex justify-between items-center px-6  ">     <label>
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

            <input hidden ref={inputPostImage} onChange={Imagehandle} className='' type='file'></input></label>
            
           <div className="buttons"> <button className='botn' onClick={mutate} disable={`${BtnIsLoading}  `}>{BtnLoading?<SyncLoader color="#ffcc24a0" />:"Post"}</button>
            <button className='botn' onClick={()=>{SetPosting(false)}}>Cancle</button></div>
            </div>
        </div>
       
        
     
    </div>
  )
}
