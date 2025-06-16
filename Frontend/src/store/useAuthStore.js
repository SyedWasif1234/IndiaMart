// zustand is used for global state manegment =>means can access variable or props from any where in the project

import {create} from 'zustand';
import {axiosInstance} from  '../lib/axios';


//variable and methods which we will use globally 
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

 


}))