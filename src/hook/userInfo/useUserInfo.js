import { useQuery } from "@tanstack/react-query";
import axios from "axios";

 export default function UseUserInfo(Token,Id)
{
    
  async function userDataApirequest()
  {
    const option ={
      method:"GET",
      url:"https://linked-posts.routemisr.com/users/profile-data",
      headers:{
        token:Token,
      }
    }
    const request = await  axios.request(option);
    // console.log(Id);
    return request
  }

    const {data:datauser,error:errorUser,isLoading:isLoadingUser }= useQuery({
    queryKey:["profile user data"],
    queryFn:userDataApirequest,
    
    enabled:!!Id?.user,
      staleTime: 1000 * 60 *20 , // 👈 بيانات تتحفظ 5 دقايق
    cacheTime: 1000 * 60 * 10, // 👈 الكاش يفضل 10 دقايق حتى لو مفيش component بيستخدمه
    refetchOnWindowFocus: false,
    
  })
  //  console.log(errorUser)
  // console.log(datauser)
  return[datauser,errorUser,isLoadingUser]

}