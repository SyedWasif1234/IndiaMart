import React from 'react'
import { useState , useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useParams , useNavigate } from 'react-router-dom'


import { axiosInstace } from '../lib/axios'
import { ClipboardEdit, List, Loader2 } from 'lucide-react'


const InquirySchema = z.object({
  message:z.string().min(5 , "message must be at least of 5 charecter"),
  product_id:z.number()
})

const CreateInquiryForm = () => {

    const [isSubmitting , setisSubmitting] = useState(false)

    const {register , handleSubmit , formState:{errors} , setValue} = useForm({
        resolver:zodResolver(InquirySchema)
   })

    const {id} = useParams()
    console.log("id in inquiry from :",id  )
    
   const navigate = useNavigate()

    useEffect(() => {
      if (id) {
        setValue('product_id', parseInt(id)); // Set it as number
      }
    }, [id, setValue]);

    const onSubmit = async(data) =>{
      console.log("submitting data: ", data)
        try {
            setisSubmitting(true)
            const res = await axiosInstace.post("/inquiries",data)
            console.log(res)
            toast.success(res.data.message || "inquiry added successfully")
            navigate("/Products")
        } catch (error) {
            console.log("error occured while submiting inquiry",error),
            toast.error("error occured while submiting inquiry")
        }
        finally{
            setisSubmitting(false)
        }
    }
  return (
    <div>
       <div className="p-8 max-w-4xl mx-auto  text-gray-800 bg-gray-100 shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-1">Submit Inquiry</h1>
     

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
       
          <div>
              <label className="block font-medium flex items-center gap-2">
                <List size={16} /> Product Id
              </label>
                <input
                  type="hidden"
                  {...register("product_id" , { valueAsNumber: true })}
                  placeholder="Product_id"
                  className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                />
          </div>
        {/* Description */}
        <div>
          <label className="block font-medium flex items-center gap-2 mb-1">
            <ClipboardEdit size={16} /> Message
          </label>
          <textarea
            rows={5}
            {...register("message")}
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
