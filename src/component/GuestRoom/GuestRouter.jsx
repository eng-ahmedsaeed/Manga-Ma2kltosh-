import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import TokenCont from '../Token/TokenProvider.Context';

export default function GuestRouter({children}) {
    
    const {Token} = useContext(TokenCont);
    if(Token)
        return <Navigate to={'/Home'}/>

    else 
       return children

}
