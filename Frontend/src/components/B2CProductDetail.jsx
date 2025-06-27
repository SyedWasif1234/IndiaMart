
import {  useParams } from 'react-router-dom'
import { useState , useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePaymentStore } from '../store/usePaymentStore'

const B2CProductDetail = () => {

    const {id} = useParams()
    const {product , getProductById , isProductLoading} = useProductStore()


  
       useEffect(() => {
        getProductById(id)
    },[id ])
     

    console.log("product details : ",product)

  

    const {createPayment , isPaymentProceeding , payment} = usePaymentStore();


   const handlePayment = (product) => {
      const pricePaise = product?.price * 100;
      createPayment(pricePaise);
    };

   
 if(isProductLoading){
         return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin"/>
            </div>
        )
    }
    
  

  return (
    <div className="bg-white min-h-screen p-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 max-w-7xl mx-auto">
        {/* Left: Image */}
        <div className="flex flex-col items-center">
          <img src={product?.image} alt="product" className="w-full max-w-xs object-contain" />
          <div className="flex gap-4 mt-4">
            <button  onClick={()=>handlePayment(product)} className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded font-semibold shadow" >
             Order
            </button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="text-gray-800">
          <h1 className="text-xl font-semibold">{product?.title}</h1>

          <div className="flex items-center gap-2 mt-1">
            
            <span className="text-sm text-gray-600"> Ratings & 17 Reviews</span>
          </div>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-2xl font-bold text-green-600">₹{product?.price}</span>
           
          </div>


          {/* Description */}
          <div className="mt-6 text-sm">
            <h2 className="font-semibold">Description</h2>
            <p className="text-gray-700">{product?.description}</p>
          </div>

          {/* Seller Info */}
          <div className="mt-6 text-sm">
            <h2 className="font-semibold">Seller Id</h2>
            <p>
              {product?.seller_id}{' '}
              <span className="text-blue-600 font-semibold">⭐ ⭐  ⭐  ⭐  ⭐</span>
            </p>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default B2CProductDetail

