import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from"../../images/logo.png"
import { useContext } from "react";
import TokenCont from "../Token/TokenProvider.Context";

import defultpfp  from'../../images/defultpfp.jpg'
import useOnline from "../../hook/online/useOnline";
import UseUserInfo from "../../hook/userInfo/useUserInfo";

export default function NavBar() {
  const {Token,Id,logout}=useContext(TokenCont)
    const [display,setdisplay,] = useState(false);
    const[online,setOnline]=useOnline();
    // console.log( "Activity test",online);
    const[datauser,erroruser]=UseUserInfo(Token,Id);
    // console.log(display);
  return (
    <>
    
      <div className=" container flex bg-[#fcecab] m-auto  justify-between px-30 py-3 rounded-4xl mt-6  flex-wrap items-center">
    
 <div className="TM flex items-center gap-3 ">     <img src={logo} alt='mango logo' className="w-[7rem] h-[7rem]" />

</div>
  <h2 className="NavBarTextCustmizations font-extrabold  text-5xl ">MANGO</h2>
 {Token ? (
   <>
 <div className="control flex gap-4">
 <ul className=" text-3xl gap-4 text-amber-500 hidden md:flex  font-bold items-center">
  <li className="relative">
    <div className={`activity bg-gradient-to-r ${online? "from-orange-500 via-orange-400 to-yellow-500":"from-red-700 via-red-700 to-red-600"} w-3 h-3 rounded-full absolute top-1 right-1`}></div><img className="rounded-full w-15" src={datauser?.data.user.photo} alt=""  /></li>
    <li><NavLink to="/Home">Home</NavLink></li>
    <li><NavLink to="/Profile">Profile</NavLink></li>
</ul>
 <div className="logout hidden md:flex  gap-4 items-center hover:cursor-pointer hover:scale-110" onClick={logout}>  
  <svg xmlns="http://www.w3.org/2000/svg" width={30 } height={30} viewBox="0 0 24 24" fill="none">
  <path d="M21.5 13V15.26C21.5 19.73 19.71 21.52 15.24 21.52H15.11C11.09 21.52 9.24 20.07 8.91 16.53" stroke="#ea7d35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M8.89999 7.56023C9.20999 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023" stroke="#ea7d35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M15 12H3.62" stroke="#ea7d35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M5.85 8.65039L2.5 12.0004L5.85 15.3504" stroke="#ea7d35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg></div>


 </div>
 </>

) : (
  <>
 <ul className=" text-2xl gap-4 text-amber-500 hidden md:flex  font-bold">
    
    <li><NavLink to="/Login">Login</NavLink></li>
    <li><NavLink to="/Register">Register</NavLink></li>
</ul>

  </>
  
)}
 
<svg className=" md:hidden " xmlns="http://www.w3.org/2000/svg" onClick={()=>{setdisplay(!display)}} width={30} height={30} viewBox="0 0 24 24" fill="#ea7d35">
  <g clipPath="url(#clip0_4418_8588)">
    <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17 17.25H7C6.59 17.25 6.25 16.91 6.25 16.5C6.25 16.09 6.59 15.75 7 15.75H17C17.41 15.75 17.75 16.09 17.75 16.5C17.75 16.91 17.41 17.25 17 17.25ZM17 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H17C17.41 11.25 17.75 11.59 17.75 12C17.75 12.41 17.41 12.75 17 12.75ZM17 8.25H7C6.59 8.25 6.25 7.91 6.25 7.5C6.25 7.09 6.59 6.75 7 6.75H17C17.41 6.75 17.75 7.09 17.75 7.5C17.75 7.91 17.41 8.25 17 8.25Z" fill="white" style={{fill: 'var(--fillg)'}} />
  </g>
  <defs>
    <clipPath id="clip0_4418_8588">
      <rect width={30} height={30} fill="white" />
    </clipPath>
  </defs>
</svg>
    <div className="dropmenu md:hidden md:w-0 ">

   <ul className={" text-2xl gap-4 text-amber-500   w-100     "+ (display ? 'relative':'hidden')}>
  <li><NavLink to={''}>Register</NavLink></li>
  <li><NavLink to={'/Login'}>Login</NavLink></li>
  <li><NavLink to={'/Home'}>Home</NavLink></li>
 </ul>
    </div>
      </div>
    
    </>
  );
}
