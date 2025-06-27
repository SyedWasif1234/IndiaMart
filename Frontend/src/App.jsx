import React from 'react'
import { useState , useEffect } from 'react'
import {Routes , Route , Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthstore } from './store/useAuthStore'
import Layout from './layout/Layout'
import Profile from './pages/Profile'
import AddProduct from './pages/AddProduct'
import B2BProductsPage from './pages/B2BProductsPage'
import B2CProductsPage from './pages/B2CProductsPage'
import ProductDetail from './components/ProductDetail'
import B2CProductDetail from './components/B2CProductDetail'
import AddInquiry from './pages/AddInquiry'
import GetInquiries from './pages/GetInquiries'
import OrderPage from './pages/OrderPage'

import AdminLayout from './layout/AdminLayout'
import UsersPage from './AdminComponents/UsersPage'
import AdminProductsPage from './AdminComponents/AdminProductsPage'
import Dashboard from './AdminComponents/Dashboard'

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
          <Route path='/B2CProducts' element={ authUser ? <B2CProductsPage/> : <Navigate to = "/Login" /> } />
          <Route path='/B2BProducts' element={ authUser ? <B2BProductsPage/> : <Navigate to = "/Login" /> } />
          <Route path="/B2Cproduct/:id" element={<B2CProductDetail />} />
        
          <Route path="/Inquiry-form/:id" element={ authUser ? <AddInquiry/> : <Navigate to = "/Login" /> } />
          <Route path="/get-Inquiries" element = {authUser?.role === "SELLER" ? <GetInquiries/> : <Navigate to = "/" /> } />
          
          <Route path="/B2Bproduct/:id" element={<ProductDetail />} />

          <Route path="/order/:id" element={ authUser ? <OrderPage/> : <Navigate to = "/Login" /> } />
        </Route>
  
        <Route path='/Admin-Panel' element={authUser?.role === "ADMIN" ?  <AdminLayout/> : <Navigate to = "/" /> }>
          <Route index element={<Dashboard />} />
         <Route path='users' element={<UsersPage/> } /> 
         <Route path='AdminProductsPage' element={<AdminProductsPage/> } />
        </Route>
       
        <Route path="/SignUp" element={ !authUser ? <SignUpPage/> : <Navigate to = "/" /> } />
        
        <Route path="/login" element={ !authUser ? <LoginPage/> : <Navigate to = "/" /> } />
  
       

       </Routes>
    </div>
  )
}

export default App
