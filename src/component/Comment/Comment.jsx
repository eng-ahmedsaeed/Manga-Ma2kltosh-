import React from 'react'
import PostHeader from '../PostHeader/PostHeader'

export default function Comment({comment}) {
  ////! function bet7seb 2el wa2t
  function timeAgo(dateInput) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // فرق بالثواني

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} mo ago`;
    return `${Math.floor(diff / 31536000)} yr ago`;
  }
 

  
  
  return (
    <>
    
    {comment?<div className='flex justify-start items-center  w-full scale-89 pe-60 '><PostHeader   postusername={comment.commentCreator.name}  postuserphoto={comment.commentCreator.photo} postcreatedAt={timeAgo(comment.createdAt)} firstComment={comment}  ></PostHeader>  </div>:""}

    </>
  )
}
