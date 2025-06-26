import { create } from 'zustand';
import { axiosInstace } from '../lib/axios';
import toast from 'react-hot-toast';

export const usePaymentStore = create((set) => ({
  payment: null,
  isPaymentProceeding: false,

  createPayment: async (amountPaise) => {
    try {
      set({ isPaymentProceeding: true });

      // 1️⃣ Call backend to create Razorpay order
      const res = await axiosInstace.post('/payment/order', { amount: amountPaise });
      console.log("payment from usePaymentStore" , res)
      const { order_id, key_id } = res.data;

      // 2️⃣ Open Razorpay Checkout
      const rzp = new window.Razorpay({
        key: key_id,
        order_id,
        amount: amountPaise,
        currency: 'INR',
        handler: async function (response) {
          // 3️⃣ Verify payment
          try {
            await axiosInstace.post('/payment/verify', response);
            set({ payment: response });
            toast.success('Payment successful!');
          } catch (err) {
            toast.error('Payment verification failed');
          } finally {
            set({ isPaymentProceeding: false });
          }
        },
        modal: {
          ondismiss: () => {
            toast('Payment cancelled');
            set({ isPaymentProceeding: false });
          }
        }
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate payment');
      set({ isPaymentProceeding: false });
    }
  }
}));
