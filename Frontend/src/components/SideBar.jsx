import React from 'react';
import { Home, Folder, HelpCircle , User , Store } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuthstore } from '../store/useAuthStore';

const SideBar = () => {
    const {authUser} = useAuthstore();

  return (
    <div className="space-y-6 ">
      <ul className="space-y-4 text-gray-800 text-sm font-semibold">
        {authUser?.role === "ADMIN" && (
            <li>
            <Link to = "/Admin-Panel" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded '>
            <User className="w-4 h-4" />
                Admin Panel
            </Link>
        </li>
        )}
       <Link to = "/Products" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded '>
            <Store className="w-4 h-4" />
                Products
            </Link>
       <li>
            <Link to = "/Category" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded '>
            <Folder className="w-4 h-4" />
                Category
            </Link>
        </li>
         <li>
            <Link to = "/get-Inquiries" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded'>
            <HelpCircle className="w-4 h-4" />
                Inquiry
            </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
