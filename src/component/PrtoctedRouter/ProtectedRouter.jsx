import React, { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import TokenCont from '../Token/TokenProvider.Context';

export default function ProtectedRouter({children}) {
 
    const {Token} = useContext(TokenCont);
  if(Token)
  {
      
  

    return children
  

  }
  else 
  {
    return <Navigate to={'/Login'}/>
  }

}
