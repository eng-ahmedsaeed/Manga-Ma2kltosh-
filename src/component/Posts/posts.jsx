

;

import Poster from "../Poster/Poster";
import { Toaster } from "react-hot-toast";


export default function Posts({posts,loggedInUser}) {
 
 
  




  return (
    
           <div className="Home flex flex-col gap-y-10 w-full justify-center items-center mt-8">
                  <Toaster className=" text-amber-500 sm:text-2xl font-sans font-bold" position="top-center" reverseOrder={false} /> 
               
          {posts.map((post) => {
                     return <Poster post={post} key={post.id} postDetails={false} loggedInUser={loggedInUser} ></Poster>
          })}
        </div>
  )
}