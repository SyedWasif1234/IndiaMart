import React from 'react'
import { useState , useEffect } from 'react'
import {Routes , Route , Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthstore } from './store/UseAuthStore'
import Layout from './layout/Layout'
import Profile from './pages/Profile'
import AddProduct from './pages/AddProduct'

const App = () => {

  const { authUser  }= useAuthstore();
  
  return (
    <div>
       <Toaster/>

       <Routes>

        <Route path="/" element= {<Layout/>}>
          <Route path="/" element = {authUser ? <HomePage/> : <Navigate to = "/Login" />} />
          <Route path="/profile" element={ authUser ? <Profile /> : <Navigate to = "/Login" />} />
          <Route path="/add-product" element={ authUser ? <AddProduct/> : <Navigate to = "/Login" /> } />
        </Route>
  
        <Route path="/SignUp" element={ !authUser ? <SignUpPage/> : <Navigate to = "/" /> } />
        
        <Route path="/login" element={ !authUser ? <LoginPage/> : <Navigate to = "/" /> } />
  
       

       </Routes>
    </div>
  )
}

export default App
