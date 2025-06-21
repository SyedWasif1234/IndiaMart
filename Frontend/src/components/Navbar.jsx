import React from 'react';
import { useState } from 'react';
import {
  Home,
  Menu,
  Search,
  User,
  LogOut
} from 'lucide-react';

import { useAuthstore } from '../store/useAuthStore';
import { set } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LogoutButton from "./LogoutButton"

const Navbar = () => {
    const {authUser} = useAuthstore();

    const [search , setSearch] = useState(false)
    const [isOpen , setisOpen] = useState(false);




  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow-sm bg-white  border-b border-gray-250">
      {/* Left Section */}
      <div className="flex items-center  gap-3 ">
        {/* Home Icon */}
         <Link to = "/" >
             <Home className="text-teal-700 w-6 h-6 cursor-pointer" />
        </Link>
       

        {/* Centered Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-[400px] shadow-sm ">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-600 flex-grow"
          />
          <Search className="text-gray-600 w-5 h-5 cursor-pointer" />
        </div>
      </div>
      
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
            <p className="text-teal-700 font-semibold">{authUser?.name?.toUpperCase() || "Guest"}</p>
        <div className="w-10 rounded-full mr-2 ">
                <img
                    alt="Profile"
                    className="rounded-full w-10 h-10"
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${authUser?.id || "guest"}`}
                />
            </div>
            <div className='relative'>
                 <Menu 
                    onClick={()=> setisOpen(!isOpen)}
                    className="text-teal-700 w-6 h-6 cursor-pointer dropdown-content " />

                    {isOpen && (
                          <ul  tabIndex={0} className="absolute right-0 top-8 z-10 w-40 bg-white shadow-lg rounded-md p-2 border space-y-2">
                            <li>
                                <Link to = "/profile" className='flex items-center gap-2 hover:bg-teal-700 hover:text-gray-100 p-2 rounded text-gray-600'>
                                     <User className="w-4 h-4" />
                                        My Profile
                                </Link>
                            </li>
                            {authUser?.role === "SELLER" && (
                                <li>
                                    <Link to = "/add-product" className='flex items-center gap-2 hover:bg-teal-700 hover:text-gray-100 p-2 rounded text-gray-600'>
                                        <User className="w-4 h-4" />
                                        Add Product
                                    </Link>
                                </li>
                                
                            )}

                            <li>
                                 <LogoutButton  className="flex items-center gap-2 px-2 py-2 rounded text-red-900  hover:bg-red-900 text-sm">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </LogoutButton>
                            </li>
                         
                        </ul>
                    )}
            </div>
      </div>
    </nav>
  );
};

export default Navbar;
