import React from 'react';
import { Link } from 'react-router-dom';

const B2CLoadProducts = ({ products }) => {
    console.log(products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-gray-100 text-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-300 hover:border-gray-400 border-r-2 border-b-2 border-t-2 border-l-2 "
        >
          <div className="bg-white flex items-center justify-center h-48 p-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full object-contain"
            />
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-300">By Seller #{product.seller_id}</p>

            <div className="flex items-center text-yellow-400 mt-1">
              ★★★★☆ <span className="ml-1 text-xs text-gray-400">(24)</span>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <span className="text-blue-400 font-bold text-lg">₹{product.price}</span>
              <span className="text-sm text-gray-300 font-normal">MOQ: 20 pcs</span>
            </div>

           <div className='flex gap-2  '>
            <Link to = {`/B2Cproduct/${product.id}` } className='flex-1'>
                <button className="mt-4 w-full border border-gray-300 text-gray-800 font-semibold py-1 rounded hover:bg-teal-800 hover:text-white transition">
                    Details
                </button>
            </Link>
           </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default B2CLoadProducts;
