import { create } from "zustand";
import { axiosInstace } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useOrderStore = create((set)=>({
    orders:[],
    order:null,
    isOrdersLoading:false,
    isOrderLoading:false,
    isOrdering:false ,

    

    getAllOrders: async() =>{
        set({isOrdersLoading:true})
        try {
            const res = await axiosInstace.get("/orders")
            console.log(res.data)
            set({orders:res.data})
        } catch (error) {
            console.log("error fetching orders");
            toast.error("error fetching orders")
        }
        finally{
            set({isOrdersLoading:false})
        }
    },

    getOrderById: async(id)=>{
        try {
            set({isOrderLoading:true})
            const res = await axiosInstace.get(`/orders/${id}`)
            set({order:res.data})
            console.log("Prodect detail from useProductstore :", res.data)
        } catch (error) {
            console.log("error occured while fetching order ")
            toast.error("error occured while fetching order")
        }
        finally{
            set({isOrderLoading:false})
        }
    }
}))