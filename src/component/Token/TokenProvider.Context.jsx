import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

const TokenCont=createContext(null);
export  function TokenProvider({children}) {
    const [Token,SetToken]=useState(localStorage.getItem('token'));
    const[Id,SetId]=useState(Token); 
    const [user,SetUser]=useState(null) 
    
    function logout()
    {
      localStorage.clear('token')
      SetToken(null)
    }
  


    useEffect(()=>{
      if(Token)
        SetId(jwtDecode(Token));

    },[Token])
  return (
    <TokenCont.Provider value={{Token,SetToken ,Id,SetId ,user,SetUser,logout}}>{children}</TokenCont.Provider>
  )
}
export  default TokenCont;