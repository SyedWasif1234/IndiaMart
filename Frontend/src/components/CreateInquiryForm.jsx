import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const CreateInquiryForm = () => {

    const [loading , setIsLoading] = useState(false)

    const {register , handleSubmit , formState:{errors}} = useForm({
        resolver:zodResolver(InquirySchema)
   })

    const onSubmit = async(data) =>{
        try {
            setIsLoading(true)
            const res = await axiosInstace.post("/inquiries",data)
            console.log(res)
            toast.success(res.data.message || "inquiry added successfully")
            navigate("/inquiries")
        } catch (error) {
            console.log("error occured while adding product",error),
            toast.error("error occured while adding product")
        }
        finally{
            setIsLoading(false)
        }
    }
  return (
    <div>
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
    </div>
  )
}

export default CreateInquiryForm
