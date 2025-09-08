import React, { useContext, useState } from 'react'
import defultpfp  from'../../images/defultpfp.jpg'
import { Dropdown, DropdownItem } from 'flowbite-react'
import TokenCont from '../Token/TokenProvider.Context'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function PostHeader({postusername,postuserphoto,postcreatedAt,firstComment,postUserId,postId,})

{
 
 
 
 
 ////////////////////////////////!This part for the post delete//////////////////////////////////////////
 
  // console.log(postId)


  const {Id,Token} =useContext(TokenCont)
  

  const querClient = useQueryClient();


// console.log("User Id from context:", Id.user); 
// console.log("First comment object:", firstComment);
// console.log("First comment creator Id:", firstComment?.commentCreator?._id);

////!function to handle the delete of the post

async function postDeleteapi(DeletedPost)
{
  console.log("Post id to be deleted",DeletedPost)
  const options={
    method:"DELETE",
    url:`https://linked-posts.routemisr.com/posts/${DeletedPost}`,
    headers:{token:Token}
    }
    return await axios.request(options)
}

const{mutate:postDelete}=useMutation({
  mutationKey:["Postdelete"],
  mutationFn:postDeleteapi,
  onMutate:()=>{toast.loading("ur mang is being cutten out🥭",{id:'load'})},
  onSuccess:()=>{toast.success("Ur mango hadbeen cutten out🥭") 
    querClient.invalidateQueries(["GetAllPosts"])
  },
  onError:(err)=>{toast.error(err.message)},
  onSettled:()=>{toast.dismiss('load')}
  

})

 ////////////////////////////////!This part for the comment delete//////////////////////////////////////////
async function commentDeleteapi(DeletedComment)
{
  // console.log("Comment id to be deleted",DeletedComment)
  
  console.log(DeletedComment);
  const options={
    method:"DELETE",
    url:`https://linked-posts.routemisr.com/comments/${DeletedComment}`,
    headers:{token:Token}
    }
    return await axios.request(options)
}

const{mutate:CommentDelete}=useMutation({
  mutationKey:["Commentdelete"],
  mutationFn:commentDeleteapi,
  onMutate:()=>{toast.loading("ur mango is being cutten out🥭",{id:'load'})},
  onSuccess:()=>{toast.success("Ur mango hadbeen cutten out🥭") 
    querClient.invalidateQueries(["GetAllPosts"])
  },
  onError:(err)=>{toast.error(err.response.data.message)
    console.log(err.response.data)
  },
  onSettled:()=>{toast.dismiss('load')}
  

})

  return (
    
                      <div className="header flex  justify-between items-center gap-56  w-full">
                        
                    <div className="profile flex p-2 gap-3 items-center  ">
                      <img
                        className="w-[3rem] h-[3rem] rounded-3xl" 
                        onError={(e)=>{e.target.src =defultpfp}}
                        src={postuserphoto}
                        alt="photo"
                      />
                      <div className="data flex-col"> 
                        <h1 className="postInfo">{postusername}</h1>
                        <h3 className="postInfo text-[1rem]">
                          {postcreatedAt}
                        </h3>
                      </div>
                    </div>

                    {firstComment?<div className='commenttext postInfo text-[0.9rem]'>{firstComment.content}</div>:""}
                    {  <div className='editmenu'>
                    
                    
{(postUserId == Id.user || (firstComment && firstComment?.commentCreator?._id == Id.user)) ?                    <Dropdown className='text-amber-400 px-10 text-1xl ' label={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="#FFD230">
  <g clipPath="url(#clip0_4418_8495)">
    <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="white" style={{fill: 'var(--fillg)'}} />
  </g>
  <defs>
    <clipPath id="clip0_4418_8495">
      <rect width={24} height={24} fill="white" />
    </clipPath>
  </defs>
</svg>

} dismissOnClick={false}  arrowIcon={false}  >
      <DropdownItem>Edit</DropdownItem>
      <div onClick={firstComment?()=>{CommentDelete(firstComment._id)}:()=>{postDelete(postId)}}><DropdownItem>Delete</DropdownItem></div>
    </Dropdown>:" "}
                    </div>}
                  </div>
  )
}
