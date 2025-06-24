import React from 'react'
import { useProductStore } from '../store/useProductStore';
import { useEffect } from 'react';
import {Loader} from "lucide-react"
import SideBar from '../components/SideBar';
import LoadProducts from '../components/LoadProducts';
import PopularCategories from '../components/PopularCategories';

const HomePage = () => {

    const {getAllProducts , products , isProductsLoading } = useProductStore();

    useEffect(() => {
        getAllProducts();
    },[getAllProducts])

    console.log("products" , products)
    console.log(Array.isArray(products))
    if(isProductsLoading){
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin"/>
            </div>
        )
    }

    
  return (
   <div className="min-h-screen flex flex-col">

      {/* Below Navbar: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/6 bg-white p-4 border-r shadow border-gray-295 ">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100 ">
          <PopularCategories />
          <h1 className="text-2xl font-semibold  text-gray-600 mb-4">Welcome to Mart</h1>
        
          {/* Replace below with your content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">

           
            {/* Example content */}
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
