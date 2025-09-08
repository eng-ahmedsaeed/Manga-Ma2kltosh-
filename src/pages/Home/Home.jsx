import React, { useContext, useEffect, useState } from "react";
import axios, { Axios } from "axios";
import TokenCont from "../../component/Token/TokenProvider.Context";
import { BounceLoader } from "react-spinners";
import { QueryClient, QueryClientProvider,useQuery, useQueryClient } from "@tanstack/react-query";
import Posts from "../../component/Posts/posts";
import CreatPost from "../../component/CreatePost/CreatePost";
import { Helmet } from "react-helmet";
import UseUserInfo from "../../hook/userInfo/useUserInfo";
import PostSkeleton from "../../component/Post skeleton/post skeleton";

export default function Home() {

  const [page,setPage]=useState(1);
  const{Token,Id}=useContext(TokenCont);
  const queryClient=useQueryClient();

 const[datauser,erroruser]=UseUserInfo(Token,Id);
//  console.log(datauser);
//////!Querycontext

 const x = useQuery(
      {
        queryKey:["GetAllPosts",page],
        queryFn:getposts,
        staleTime:5000,
        retry:true,
        refetchOnMount:true,
       

      }
 )
//  console.log(x);
    


  async function getposts() {
       
      const options = {
        method: "GET",
        url: `https://linked-posts.routemisr.com/posts?limit=100&sort=-createdAt&page=${page}`,
        headers: {
          token: Token,
        },
      };
      const response = await axios.request(options); 
      // console.log(response);
      return response;
    
  }
  // console.log( "testing the x", x.data);

  return (
    
    <div className="flex justify-center items-center space-y-4 flex-wrap">
      <Helmet>
    
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/images/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mango|Home</title>
  
      </Helmet>
      {x.isLoading ?   (
         <PostSkeleton count={10}></PostSkeleton>
      ):(<>
      
         <CreatPost></CreatPost>
        <Posts posts={x.data.data.posts}loggedInUser={datauser} ></Posts>
        <div className="controls flex space-x-9">
        <button className="botn" onClick={()=>{
          setPage((page)=1?1:(page-1));
          queryClient.invalidateQueries(["GetAllPosts",page])
          
        }}>Previous Feed</button>
      <button className="botn" onClick={()=>{
          setPage((page+1)>x.data.data.paginationInfo.numberOfPages?x.data.data.paginationInfo.numberOfPages:(page+1))
          queryClient.invalidateQueries(["GetAllPosts",page])
        }}>Next Feed</button>
        </div>
  
      </>
      )}
    </div>
  );
}
