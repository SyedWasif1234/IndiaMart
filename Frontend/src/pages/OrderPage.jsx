import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { usePaymentStore } from "../store/usePaymentStore";
import { useProductStore } from "../store/useProductStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const OrderPage = () => {
  const [quantity, setQuantity] = useState(1);

 

  const {id} = useParams();
   const {product , getProductById , isProductLoading} = useProductStore();

  useEffect(() => {
    getProductById(id);
  },[id ]);

  console.log("product from order section :",product)

  const {createPayment ,  payment} = usePaymentStore();

  const salesTax = 14.17;
  const orderTotal = (product?.price * quantity + salesTax).toFixed(2);


  const HandlePayment = () => {
    const pricePaise = orderTotal * 100;
    createPayment(pricePaise);
  };


  
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-sm text-gray-600">
      <h1 className="text-center text-2xl font-semibold mb-6">SECURE CHECKOUT</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. Review Order */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">1. REVIEW YOUR ORDER (1 ITEM)</h2>
          <div className="flex items-center mb-2">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-16 h-16 mr-4"
            />
            <div>
              <p>{product?.title}</p>
              <p className="text-xs text-gray-500">Color: Tan</p>
              <p className="text-xs text-gray-500">Finish: Leather / RFID</p>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 border p-1 text-xs"
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    Qty: {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="font-semibold">SUBTOTAL: {product?.price * quantity} INR</p>

          <div className="mt-4">
          

            <p className="font-semibold mt-2">Select delivery:</p>
            <p className="text-sm mt-1">FREE - Regular (5–10 business days, tracking)</p>

        
          </div>
        </div>

        {/* 2. Delivery Address */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">2. DELIVERY ADDRESS</h2>
          <form className="grid grid-cols-1 gap-3">
            <input className="border p-2" placeholder="Email address*" required />
            <input className="border p-2" placeholder="First name*" required />
            <input className="border p-2" placeholder="Last name*" required />
            <input className="border p-2" placeholder="Phone*" required />
            <input className="border p-2" placeholder="Delivery address*" required />
           
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> Same billing address
            </label>
          </form>
        </div>

        {/* 3. Select Payment Method */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">3. SELECT PAYMENT METHOD</h2>
          <div className="flex flex-col gap-3">
            <button className="border p-2 flex items-center gap-2"><Plus className="w-4 h-4" /> Card</button>
            <button className="border p-2 flex items-center gap-2"><Plus className="w-4 h-4" /> Razorpay</button>
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">ORDER SUMMARY</h3>
            <p>1 x {product?.title} — {product?.price} INR</p>
            <p className="text-sm">Shipping to *** — FREE</p>
            <p className="text-sm">Sales Tax — {salesTax}</p>
            <hr className="my-2" />
            <p className="font-bold">ORDER TOTAL — INR {orderTotal}</p>

            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" /> I'm keen for new releases and subscriber exclusives.
            </label>

            <button onClick={() => HandlePayment()} className="mt-4 bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700">
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
