

import React, { useContext, useEffect, useRef, useState } from "react"; 
import PostHeader from "../PostHeader/PostHeader";
import Comment from "../Comment/comment";
import { Link } from "react-router-dom";
import TokenCont from "../Token/TokenProvider.Context";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { SyncLoader } from "react-spinners";


export default function poster({post,postDetails,loggedInUser}) {
  const [Love,SetLove] = useState(false); 
  // console.log (newComment);
  const {Token} = useContext(TokenCont);

///QUery client to refetch
  const querClient=useQueryClient();

///use ref as the every time the state that i took the comment by change it roteates the array of comments 
const inputComment=useRef("")
///State to disable the comment button 
const[commentSent,setCommentSent] =useState(false)

// console.log("input ref test",inputComment.current.value)

// console.log("Post object",post.user._id)
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
var loading;
async function addcomment ()
{

  ///Disabling the button
  setCommentSent(true);
  const options = {
    method : "POST",
    url:"https://linked-posts.routemisr.com/comments",
    data:{
      content:inputComment.current.value,
      post:post.id
    } ,
    headers:{
      token:Token
    }
  }
 loading = toast.loading("ur mango is loading ...🥭🥭🥭");
    const request = await axios.request(options);
    console.log( "testing created comment ",request) 
    return request.data.message;

  
}


const {mutate} =useMutation({
  mutationKey:["postComment"],
  mutationFn: addcomment,
 onSuccess: (req) => {
  toast.dismiss(loading);
  toast.success("Comment added successfully");
  inputComment.current.value="",
 

  postDetails? querClient.invalidateQueries(["PostDetails"]):querClient.invalidateQueries(["GetAllPosts"])
  setCommentSent(false);
},
onError: (err) => {
  toast.dismiss(loading);
  toast.error(err.message);
  setCommentSent(false);
},

  // onSettled:()=>{  ;}
})


            return (<>  
              
              <div className="post  w-[80%] " key={post.id}>
                <div className="posts postcontainer m-auto  bg-[#fcec985b]  space-y-5 rounded-3xl py-4  ">
                     <PostHeader postusername={post.user.name} postuserphoto={post.user.photo} postcreatedAt={timeAgo(post.createdAt)} firstComment={false} postUserId={post.user._id} postId={post.id} ></PostHeader>
                  <div className="body px-9 justify-center items-center m-auto">
                    <p className="postText overflow-hidden ">{post.body}</p>
                    <div className="img   flex justify-center">
                      {post.image?<img className="w-100" src={post.image} alt="post" />:""}
                    </div>
                  </div>
                  <div className="footer   mx-3 flex justify-center flex-wrap space-y-4">
                    <div className="react flex justify-around w-full  bg-[#faebc0]  mt-2 rounded-3xl">
                      <div className="love hover:cursor-pointer" onClick={()=>{SetLove(!Love)}}>
                        <svg
                          className={`hover:fill-red-300 ${Love?"fill-red-600":''}`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="3rem"
                          height="3rem"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <g clipPath="url(#clip0_4418_8679)">
                            <path
                              d="M16.44 3.09961C14.63 3.09961 13.01 3.97961 12 5.32961C10.99 3.97961 9.37 3.09961 7.56 3.09961C4.49 3.09961 2 5.59961 2 8.68961C2 9.87961 2.19 10.9796 2.52 11.9996C4.1 16.9996 8.97 19.9896 11.38 20.8096C11.72 20.9296 12.28 20.9296 12.62 20.8096C15.03 19.9896 19.9 16.9996 21.48 11.9996C21.81 10.9796 22 9.87961 22 8.68961C22 5.59961 19.51 3.09961 16.44 3.09961Z"
                              fill="white"
                              style={{ fill: "var(--fillg)" }}
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4418_8679">
                              <rect width={24} height={24} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
<Link  to={"../PostDetails/"+ post.id }>                      <div className="comment hover:cursor-pointer" >
                        <svg
                          className="hover:fill-amber-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="3rem"
                          height="3rem"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <g clipPath="url(#clip0_3261_13042)">
                            <path
                              d="M15.39 20.9301L14.12 20.5901C13.34 20.3701 12.81 19.6701 12.81 18.8501C12.81 18.0301 13.34 17.3201 14.16 17.0901L15.39 16.7701C16.01 16.6001 16.46 16.1401 16.63 15.5401L16.96 14.3201L17.03 14.0901C17.3 13.4001 17.94 12.9201 18.69 12.9201C19.46 12.9201 20.12 13.3601 20.38 14.0501L20.79 15.5101C20.86 15.7501 20.97 15.9501 21.12 16.1301C21.46 15.3601 21.72 14.5601 21.87 13.6901C22.99 6.85011 17.16 1.02011 10.32 2.14011C6.16003 2.82011 2.81003 6.17011 2.14003 10.3201C1.79003 12.4801 2.13003 14.5301 2.97003 16.3001C3.11003 16.6001 3.18003 17.1101 3.10003 17.4401L2.42003 20.2801C2.19003 21.2301 2.77003 21.8101 3.72003 21.5801C4.71003 21.3501 5.88003 21.0601 6.57003 20.9001C6.90003 20.8201 7.40003 20.8901 7.70003 21.0301C9.55003 21.9101 11.71 22.2401 13.96 21.8101C14.65 21.6801 15.3 21.4601 15.93 21.2001C15.77 21.0801 15.59 20.9901 15.39 20.9301ZM13.39 6.31011C13.54 5.93011 13.98 5.74011 14.36 5.88011C16.11 6.56011 17.48 7.95011 18.14 9.70011C18.29 10.0901 18.09 10.5201 17.7 10.6601C17.62 10.7001 17.53 10.7101 17.44 10.7101C17.13 10.7101 16.85 10.5301 16.74 10.2301C16.23 8.88011 15.17 7.80011 13.82 7.28011C13.44 7.13011 13.25 6.70011 13.39 6.31011Z"
                              fill="white"
                              style={{ fill: "var(--fillg)" }}
                            />
                            <path
                              d="M23.21 18.8801C23.21 18.9701 23.16 19.1701 22.92 19.2501L21.65 19.6001C20.56 19.9001 19.74 20.7201 19.44 21.8101L19.1 23.0501C19.02 23.3301 18.8 23.3601 18.7 23.3601C18.6 23.3601 18.38 23.3301 18.3 23.0501L17.96 21.8001C17.66 20.7201 16.83 19.9001 15.75 19.6001L14.5 19.2601C14.23 19.1801 14.2 18.9501 14.2 18.8601C14.2 18.7601 14.23 18.5301 14.5 18.4501L15.76 18.1201C16.84 17.8101 17.66 16.9901 17.96 15.9101L18.32 14.6001C18.41 14.3801 18.61 14.3501 18.7 14.3501C18.79 14.3501 19 14.3801 19.08 14.5801L19.44 15.9001C19.74 16.9801 20.57 17.8001 21.65 18.1101L22.94 18.4601C23.2 18.5601 23.21 18.8001 23.21 18.8801Z"
                              fill="white"
                              style={{ fill: "var(--fillg)" }}
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3261_13042">
                              <rect width={24} height={24} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div></Link>
                      <div className="share hover:cursor-pointer">
                        <svg
                          className="group"
                          xmlns="http://www.w3.org/2000/svg"
                          width="3rem"
                          height="3rem"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            className="group-hover:stroke-amber-700"
                            d="M13.02 8.30957H19.87"
                            stroke="white"
                            strokeWidth={2}
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            className="group-hover:stroke-amber-700"
                            d="M16.87 18.3096H8.87C6.11 18.3096 3.87 16.0696 3.87 13.3096C3.87 10.5496 6.11 8.30957 8.87 8.30957"
                            stroke="white"
                            strokeWidth={2}
                            strokeMiterlimit={10}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            className="group-hover:stroke-amber-700"
                            d="M17.57 10.8104L20.13 8.25043L17.57 5.69043"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {postDetails?(post.comments.map((comment)=>{ return <Comment key={comment._id} comment={comment}></Comment>})):<Comment comment={[...post.comments].reverse()[0]}></Comment>}

                    <div className="addcomment flex w-full p-6 bg-[#faeece]   flex-wrap space-y-7  rounded-3xl">
                      <div className="userAvatar">

                        <img src={loggedInUser?.data?.user.photo} className="w-[2rem] h-[2rem] " alt="" />
                      </div>
                      <div className="commentinput grow ">
                        <input ref={inputComment}
                          className="w-full p-2 rounded-2xl bg-[#fffbbf] focus:bg-[#feefbb] focus:outline-amber-500 border-2 border-[#f7e7a9] "
                          type="text"
                        />
                      </div>

                      <div className="button w-full px-8">
                        <button onClick={()=>{mutate()}} className="text-[#ffcc24a0] p-4 bg-[#fffbbf] border-[#f7e7a9] border-2 w-full rounded-3xl hover:cursor-pointer  hover:outline-amber-500 hover:bg-[#feefbb]" disabled={commentSent} >
                          {commentSent?<SyncLoader color="#ffcc24a0" />:"Add comment"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div></>

            );
}
