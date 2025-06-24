import { create } from "zustand";
import { axiosInstace } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set)=>({
    products:[],
    product:null,
    isProductsLoading:false ,
    isProductLoading:false ,

    getAllProducts: async() =>{
        set({isProductsLoading:true})
        try {
            const res = await axiosInstace.get("/products")
            console.log(res.data)
            set({products:res.data})
        } catch (error) {
            console.log("error fetching produts");
            toast.error("error fetching products")
        }
        finally{
            set({isProductsLoading:false})
        }
    },

    getProductById: async(id)=>{
        try {
            set({isProductLoading:true})
            const res = await axiosInstace.get(`/products/${id}`)
            set({product:res.data})
            console.log("Prodect detail from useProductstore :", res.data)
        } catch (error) {
            console.log("error occured while fetching product ")
            toast.error("error occured while fetching product")
        }
        finally{
            set({isProductLoading:false})
        }
    }
}))