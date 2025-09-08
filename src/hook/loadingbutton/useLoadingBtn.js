import { useState } from "react";

export default function useLoadingBtn()
{
    const[BtnLoading,setBtnLoading] =useState(false)
    function BtnIsLoading ()
    {setBtnLoading(true)}
    function BtnLoaded ()
    {setBtnLoading(false)}


    return [BtnLoading,BtnIsLoading,BtnLoaded]

}