import React from 'react'
import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import TokenCont from "../../component/Token/TokenProvider.Context";

import axios, { Axios } from "axios";
import Poster from "../Poster/Poster"

import { Toaster } from 'react-hot-toast';
import UseUserInfo from '../../hook/userInfo/useUserInfo';
import PostSkeleton from '../Post skeleton/post skeleton';
export default function PostDetalis() {
  const {id}= useParams();
  const { Token,Id } = useContext(TokenCont);
   const[datauser,erroruser,isLoadingUser]=UseUserInfo(Token,Id);

console.log(datauser);
  async function getpost() {
    
    const options = {
        method: "GET",
        url: `https://linked-posts.routemisr.com/posts/${id}`,
        headers: {
          token: Token,
        },
      };
      const response = await axios.request(options); 
      
      return response.data.post;
      
    }
    
    const {data,isError,isFetching,isLoading,error}=useQuery(
      {
        queryKey:["PostDetails"],
        queryFn:getpost,
        refetchOnMount:true,
        staleTime:5000,
        
    
        
      }
    )
    
    if(isLoading||isLoadingUser)
      return   (<div className="cont flex justify-center w-full pt-50">
        
        <PostSkeleton count={1}></PostSkeleton>
        </div>)
    if (isError)
    console.log(error);
  console.log("poster data", data)
  return (
    <>
    <Toaster className=" text-amber-500 sm:text-2xl font-sans font-bold" position="top-center" reverseOrder={false} /> 
   <div className="Home flex flex-col gap-y-10 w-full justify-center items-center mt-8">
    <Poster post={data} postDetails={true} loggedInUser={datauser}  ></Poster>

        </div>
    </>
  )
}
