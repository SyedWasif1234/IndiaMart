import React from 'react'
import { useEffect } from 'react';

import { useAuthstore } from '../store/useAuthStore'
import {Loader} from "lucide-react"


const Profile = () => {
    const {authUser , me , isGettingMe}= useAuthstore();

    useEffect(()=>{
         me();
    },[me])

    if(isGettingMe){
       return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin"/>
            </div>
        )
    }

  return (
    <div className="bg-gray-900  text-white min-h-screen px-6 pt-10 pb-10 flex justify-center items-start">
      <div className="bg-gray-700 text-white rounded-lg shadow-md p-6 w-full ">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Profile Image and Work Info */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-gray-300">
            <img
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${authUser?.id || "guest"}`}
              alt="Profile"
              className="w-40 h-40 rounded-lg object-cover"
            />
            <div className="mt-6 w-full space-y-4 text-gray-300">
              <div>
                <h3 className=" font-semibold text-gray-600">Spotify New York</h3>
                <p className="text-sm text-gray-600">170 William Street<br />NY 10038</p>
              </div>
              <div>
                <h3 className=" font-semibold text-gray-600">Metropolitan Museum</h3>
                <p className="text-sm text-gray-600">525 E 68th Street<br />NY 10651</p>
              </div>
            </div>
          </div>

          {/* Right: Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                    {authUser? ( 
                        `${authUser.name}` 
                        )  : (  
                        <span className="loading loading-dots loading-xl"></span>
                    )}
                 </h2>
                <p className="text-sm text-gray-600 font-medium">{authUser?.role}</p>
              </div>
              <button className="text-gray-400 text-xl hover:text-gray-600">☆</button>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <span className="font-medium">Ranking:</span>
              <span>8.6</span>
              <span className="text-yellow-400">★★★★★</span>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="btn btn-soft btn-info bg-gray-200 text-gray-700">Send message</button>
              <button className="btn btn-soft btn-info bg-gray-200 ">Contacts</button>
              <button className="btn btn-soft btn-warning bg-gray-200 text-red-600">Report user</button>
            </div>

            {/* Tabs (dummy, not functional here) */}
            <div className="mt-6 border-b pb-2 flex gap-6 text-gray-600 border-gray-600">
              <span className="cursor-pointer font-medium text-gray-600 border-b-2 border-gray-600">About</span>
              <span className="cursor-pointer">Timeline</span>
            </div>

            {/* About Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 ">
              <div>
                <p className="font-semibold">Phone:</p>
                <p className="text-gray-600 font-medium">Phone</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
               
              </div>
              <div>
                <p className="font-semibold">E-mail:</p>
                <p className="text-gray-600 font-medium">{authUser?.email}</p>
              </div>
              <div>
                <p className="font-semibold">Site:</p>
        
              </div>
              <div>
                <p className="font-semibold">Birthday:</p>
    
              </div>
              <div>
                <p className="font-semibold">Gender:</p>
               
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
