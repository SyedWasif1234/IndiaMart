import { create } from "zustand";
import { axiosInstace } from "../lib/axios";

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
            set({product:res.data.product})
        } catch (error) {
            
        }
    }
}))