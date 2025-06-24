import React from 'react'
import { useState } from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";


import {z} from "zod";
import { useAuthstore } from '../store/useAuthStore';

const SignUpSchema = z.object({
    email:z.string().email("Enter a valid email"),
    password:z.string().min(6 , "Password must be atleast of 6 characters"),
    name:z.string().min(3 , "Name must be atleast 3 character")
})

const SignUpPage = () => {

    const {signUp , isSigningUp} = useAuthstore();

    const [showPassword , setShowPassword] = useState(false);

    const {register , handleSubmit , formState:{errors}} = useForm({
        resolver:zodResolver(SignUpSchema)
    });

    const onSubmit = async (data) =>{
        try {
            await signUp(data);
            console.log("signup data" , data)
        } catch (error) {
            console.error("SignUp failed:", error);
        }
    }

  return (
   <div>
         <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg grid grid-cols-1 lg:grid-cols-[2fr_1fr] overflow-hidden ">
  
          <div className='p-10'>
          {/* Left - Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-5">
  
              <h2 className="text-3xl font-bold text-teal-500 text-center">Create Account</h2>
  
              {/* Social login */}
              <div className="flex justify-center gap-4">
                <button type="button" className="border rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-600">f</button>
                <button type="button" className="border rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-600">in</button>
                <button type="button" className="border rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-600">G+</button>
              </div>
  
              <p className="text-sm text-gray-500 text-center">or use your email account</p>
  

               <input
                type="name"
                {...register("name",{required:"Email is required"})}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-full border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-600 bg-gray-100"
              />

              {/* Email Field */}
              <input
                type="email"
                {...register("email",{required:"Email is required"})}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-full border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-600 bg-gray-100"
              />
  
              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  {...register("password",{required:"Password is required"})}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-full border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-600 bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                >
                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
               className="bg-teal-400 text-white text-sm font-semibold px-6 py-2 rounded-full mx-auto block hover:bg-teal-600 transition disabled:opacity-70"
               disabled={isSigningUp}
              >
                 {isSigningUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
  
              {/* Footer */}
              <div className="text-center text-xs text-gray-400 mt-4">
                <p>Privacy Policy • Terms & Conditions</p>
              </div>
            </form>
          </div>
          {/* Right - Welcome Message */}
          <div className="bg-gradient-to-br from-teal-800 to-green-800 text-white flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome !</h2>
            <p className="text-sm mb-6">Fill up personal information and start journey in the world IndiaMart</p>
      
          </div>
        </div>
      </div>
      </div>
  )
}

export default SignUpPage
