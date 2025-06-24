import React, { use } from 'react'
import { useInquiryStore } from '../store/useInquiryStore'
import { useState , useEffect } from 'react'
import { Loader } from 'lucide-react'


const GetInquiries = () => {

  const { getAllInquiries , inquiries , isInquiriesLoading} = useInquiryStore()
  useEffect(() => {
    getAllInquiries()
  },[getAllInquiries])

  console.log("inquiries from getinquiries.jsx file : ",inquiries)

  if(isInquiriesLoading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  } 

  return (
     <div className="min-h-screen bg-gray-900 text-white px-6 py-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Inquiries</h2>

      <div className="space-y-6">
        {inquiries?.length > 0 ? (
          inquiries.map((inquiry, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-600 rounded-xl p-4 shadow-md"
            >
              <div className="bg-gray-700 p-4 rounded text-lg mb-4">
                 <p><span className="font-semibold">Inquiry Id:</span> {inquiry.id}</p>
                <p><span className="font-semibold">ProductID:</span> {inquiry.product_id}</p>
                <p><span className="font-semibold">BuyerID:</span>   {inquiry.buyer_id}</p>
                <p><span className="font-semibold">Message:</span>         {inquiry.message}</p>
              </div>

              <div className="flex justify-center">
                <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
                  Respond 
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No inquiries found.</p>
        )}
      </div>
    </div>
  );
};
  

export default GetInquiries
