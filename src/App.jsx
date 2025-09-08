import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";

import Login from "./pages/Login/Login";
import  Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProtectedRouter from "./component/PrtoctedRouter/ProtectedRouter";
import GuestRouter from "./component/GuestRoom/GuestRouter";
import Profile from "./pages/Profile/Profile";
import TokenCont, { TokenProvider } from "./component/Token/TokenProvider.Context";
import {QueryClientProvider,QueryClient} from"@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetalis from "./component/PostDetails/PostDetalis";

function App() {
 const route = createBrowserRouter([{path:'',element:<ProtectedRouter><Layout/></ProtectedRouter> ,
  children:[{path:'/Home',index:true,element:<Home/>},{path:'/Profile',element:<Profile/>},{path:'/PostDetails/:id',element:<PostDetalis/>}]}
,{path:'',element:<GuestRouter><Layout/></GuestRouter>,children:[{path:'/Login',element:<Login/>},{path:'/Register',element:<Register/>}]}])
 
 const Client = new QueryClient();
  return (
    <TokenProvider>
      <QueryClientProvider client={Client}>
      <div className="app bg-gray-100 min-h-[100vh] p-3">
      <RouterProvider router={route}/>
    </div>  
      </QueryClientProvider>
     

    </TokenProvider>
    
   
  )
}

export default App
