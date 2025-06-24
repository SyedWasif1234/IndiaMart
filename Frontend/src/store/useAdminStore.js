import { create } from "zustand";
import { axiosInstace } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set)=>({
    usersList:[],
    user:null,
    product:null,
    productsList:[],
    isUsersListLoading:false ,
    isproductsListLoading:false ,
    isUserLoading:false ,
    isProductLoading:false ,
    isDeletingUser:false,

    listUser : async()=>{
        try {
            set({isUsersListLoading:true})
            const res = await axiosInstace.get("/admin/users")
            set({usersList:res.data})
            console.log("user list from use admin :", res.data)
            toast.success("users data fetched Successfully")
            
        } catch (error) {
            console.log("error occured while fetching all user :", error)
            toast.error("error occured while fetching all user")
        }
        finally{
            set({isUsersListLoading:false})
        }
    },

    DeleteUser : async(id) => {
        try {
            set({isDeletingUser:true})
           const res = await axiosInstace.delete(`/admin/users/${id}`)
            console.log("Deleted user :", res)
            set((state) => ({
                usersList: state.usersList.filter(user => user.id !== id),
                isDeletingUser: false,
            }));
            toast.success("User deleted successfully")
        } catch (error) {
            console.log("error occured while deleting user")
            toast.error("error occured while deleting user")
        }
    },

    listProducts:async()=>{
        try {
            set({isproductsListLoading:true})
            const res = await axiosInstace.get("/admin/products")
            set({productsList:res.data})
            console.log("list of products from use admin :", res.data)
            toast.success("list of products fetched successfully")
        } catch (error) {
             console.log("error occured while fetching all products :", error)
            toast.error("error occured while fetching all products")
        }
        finally{
            set({isproductsListLoading:false})
        }
    }

}))