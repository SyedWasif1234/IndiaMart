import React from 'react'
import {
  Info,
  DollarSign,
  List,
  Type,
  ClipboardEdit,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';


import { axiosInstace } from '../lib/axios';
import { set } from 'react-hook-form';


const ProductSchema = z.object({
   title:z.string().min(3 , "title must be at least of 3 charecter"),
   description:z.string().min(10 , "description must be at least of 10 charecter"),
   price:z.number().min(1 , "price must be at least 1"),
   category_id:z.number(),
   image:z.string().min(1 , "image must be at least of 1 charecter"),
})



const AddProductForm = () => {

    const navigate = useNavigate();

    const {register , handleSubmit , formState:{errors}} = useForm({
        resolver:zodResolver(ProductSchema)
    })

    const [loading , setIsLoading] = useState(false)
    const [isSubmitting , setIsSubmitting] = useState(false)
    const onSubmit = async(data) =>{
        try {
            setIsLoading(true)
            const res = await axiosInstace.post("/products",data)
            console.log(res)
            toast.success(res.data.message || "product added successfully")
            navigate("/products")
        } catch (error) {
            console.log("error occured while adding product",error),
            toast.error("error occured while adding product")
        }
        finally{
            setIsLoading(false)
        }
    }
   return (
    <div className="p-8 max-w-4xl mx-auto  text-gray-800 bg-gray-100 shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-1">Edit Product</h1>
      <p className="text-sm  mb-6">/ Categories / Edit Category</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
        {/* Brand Name */}
        <div>
          <label className="block font-medium flex items-center gap-2">
            <Type size={16} /> Title
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="product name"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Category, Gender, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium flex items-center gap-2">
              <List size={16} /> Category Id
            </label>
             <input
            type="number"
            {...register("category_id" , { valueAsNumber: true })}
            placeholder="category id"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
          </div>

          <div>
            <label className="block font-medium flex items-center gap-2">
              <DollarSign size={16} /> Price
            </label>
            <input
              type="number"
              {...register("price" , { valueAsNumber: true })}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              placeholder="202.09"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium flex items-center gap-2">
            <Type size={16} /> Image URL
          </label>
          <input
            type="text"
            {...register("image")}
            placeholder="image.jpg"
            className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium flex items-center gap-2 mb-1">
            <ClipboardEdit size={16} /> Description
          </label>
          <textarea
            rows={5}
            {...register("description")}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Product description..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-900">
            {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Submit
                  </>
                )}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default AddProductForm
