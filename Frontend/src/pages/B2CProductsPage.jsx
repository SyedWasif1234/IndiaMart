import React from 'react'
import { useState , useEffect } from 'react'
import {Loader} from "lucide-react"

import { useProductStore } from '../store/useProductStore'
import B2CLoadProducts from '../components/B2CLoadProducts'


const B2CProductsPage = () => {

    const [isLoading , setisLoading] = useState(false);
    const {getAllProducts , products , isProductsLoading} = useProductStore();

    useEffect(() => {
        getAllProducts();
    },[getAllProducts])

    if(isProductsLoading){
         return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin"/>
            </div>
        )
    }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <h1 className="text-2xl font-semibold  text-gray-600 mb-4"></h1>

         {products.length > 0 ? <B2CLoadProducts products={products}/> : (
             <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
              No problems found
            </p>
           )}
    </div>
  )
}


export default B2CProductsPage
