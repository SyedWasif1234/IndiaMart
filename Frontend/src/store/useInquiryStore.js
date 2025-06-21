import { create } from "zustand";
import { axiosInstace } from "../lib/axios";
import toast from "react-hot-toast"


export const useInquiryStore = create((set)=>({
    inquiries:[],
    inquirie:null,
    isInquiryLoading:false,
    isInquiriesLoading:false,

    getAllInquiries:async()=>{
        try {
            set({isInquiriesLoading:true})
            const res= await axiosInstace.get("/inquiries")
            console.log(res)
            toast.success("Inquiry fetched successfully")
        } catch (error) {
            console.log("error occured while fetching inquiry",error),
            toast.error("error occured while fetching inquiry")
        }
        finally{
            set({isInquiriesLoading:false})
        }
    }
}))