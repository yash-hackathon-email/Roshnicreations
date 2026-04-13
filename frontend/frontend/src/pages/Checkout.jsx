import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { saveOrder } from '../services/orderService';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cartTotal, items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Cart is empty!");
    
    const customerDetails = {
       name: e.target.fullName?.value || '',
       email: e.target.email?.value || '',
       address: e.target.address?.value || '',
       phone: e.target.phone?.value || ''
    };

    const orderData = {
      user: user?.email || customerDetails.email || 'guest',
      items: items,
      total: cartTotal,
      customerDetails: customerDetails
    };

    const isConnected = await initializeRazorpay();
    if (!isConnected) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_live_SPbBEutqahnSN4', // Explicit user key
      amount: cartTotal * 100, // paise 
      currency: 'INR',
      name: 'Roshni Creations',
      description: 'Handcrafted Luxury Jewelry',
      theme: { color: '#C5A059' }, // Premium Brand Gold
      handler: async function (response) {
        toast.success(`Payment successful! ID: ${response.razorpay_payment_id}`);
        try {
          await saveOrder(orderData);
          clearCart();
          setTimeout(() => {
            navigate('/admin');
          }, 2000);
        } catch (e) {
          toast.error("Error saving your order. Please contact support.");
        }
      },
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (items.length === 0) return <div className="text-center py-24"><p>Your cart is empty.</p></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="card p-6">
          <h2 className="font-semibold text-lg border-b pb-2 mb-4">Shipping Information</h2>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
            <input name="fullName" type="text" placeholder="Full Name" defaultValue={user?.displayName || ''} required className="input-field" />
            <input name="email" type="email" placeholder="Email Address" defaultValue={user?.email || ''} required className="input-field" />
            <input name="address" type="text" placeholder="Complete Address" required className="input-field" />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" type="text" placeholder="City" required className="input-field" />
              <input name="pincode" type="text" placeholder="Pin Code" required className="input-field" />
            </div>
            <input name="phone" type="tel" placeholder="Mobile Number" required className="input-field" />
          </form>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-lg border-b pb-2 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map(i => (
              <div key={i.id} className="flex justify-between items-center text-sm">
                <span>{i.name} x {i.quantity}</span>
                <span className="font-medium text-gray-800">{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total Payable</span>
            <span className="text-maroon-500">{formatPrice(cartTotal)}</span>
          </div>
          
          <button form="checkout-form" type="submit" className="btn-gold w-full mt-6 py-3 font-bold text-lg shadow-lg">
            Pay {formatPrice(cartTotal)} Securely
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
