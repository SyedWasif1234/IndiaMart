import React from 'react';
import {
  Shirt,
  Cpu,
  Home,
  Wrench,
  Pill,
  Car,
} from 'lucide-react'; // or use other icon libraries

const categories = [
  { name: 'Apparel', icon: <Shirt className="text-teal-700" size={28} /> },
  { name: 'Electronics', icon: <Cpu className="text-teal-700" size={28} /> },
  { name: 'Home & Kitchen', icon: <Home className="text-teal-700" size={28} /> },
  { name: 'Industrial Tools', icon: <Wrench className="text-teal-700" size={28} /> },
  { name: 'Health Care', icon: <Pill className="text-teal-700" size={28} /> },
  { name: 'Automotive', icon: <Car className="text-teal-700" size={28} /> },
];

{/* in the near future we can link to each categories like if {categories.name === 'Apparel'} then link to '/apparel' and so on*/}

const PopularCategories = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <h2 className="text-gray-700 text-2xl font-semibold mb-4"> Categories Comming Soon...</h2>
      
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] gap-4">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="bg-white text-gray-800 flex flex-col items-center justify-center p-4 rounded-lg 
                       border border-gray-200 hover:border-teal-800 hover:bg-teal-50 
                       transition-all duration-300 transform hover:scale-130 cursor-pointer shadow-sm"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              {category.icon}
            </div>
            <p className="text-sm font-medium text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
