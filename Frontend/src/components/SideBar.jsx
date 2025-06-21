import React from 'react';
import { Home, Folder, HelpCircle , User , Store } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuthstore } from '../store/useAuthStore';

const SideBar = () => {
    const {authUser} = useAuthstore();

  return (
    <div className="space-y-6">
      <ul className="space-y-4 text-gray-700">
        {authUser?.role === "ADMIN" && (
            <li>
            <Link to = "/Admin-Panel" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded text-gray-600'>
            <User className="w-4 h-4" />
                Admin Panel
            </Link>
        </li>
        )}
       <Link to = "/Products" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded text-gray-600'>
            <Store className="w-4 h-4" />
                Products
            </Link>
       <li>
            <Link to = "/Category" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded text-gray-600'>
            <Folder className="w-4 h-4" />
                Category
            </Link>
        </li>
         <li>
            <Link to = "/Inquiry" className='flex items-center gap-2 hover:bg-teal-700 hover:text-white p-2 rounded text-gray-600'>
            <HelpCircle className="w-4 h-4" />
                Inquiry
            </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
