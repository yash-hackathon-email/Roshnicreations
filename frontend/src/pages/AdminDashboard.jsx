import { useState, useEffect } from 'react';
import { getOrders } from '../services/orderService';
import { formatPrice } from '../utils/helpers';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.email === 'admin@roshnicreations.com';

  useEffect(() => {
    const loadData = async () => {
      // Real data strictly from live Firebase
      const fetchedOrders = await getOrders();
      setAllOrders(fetchedOrders);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);

  // Security: Only show logged in user's orders unless they are Super Admin
  const displayOrders = isAdmin ? allOrders : allOrders.filter(o => o.user === (user?.email || 'guest'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-12">
        <div>
          <h1 className="section-title border-l-4 border-brand-500 pl-6 text-left">
            {isAdmin ? 'Management Console' : 'My Account'}
          </h1>
          {!isAdmin && user && (
            <div className="mt-4 pl-6">
              <p className="text-xl font-bold text-gray-800">{user.displayName || 'Distinguished Guest'}</p>
              <p className="text-sm font-mono text-gray-500">{user.email}</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 items-center">
          <button onClick={handleLogout} className="text-gray-500 text-sm font-bold uppercase tracking-widest hover:text-maroon-600 transition-colors">Log Out</button>
          <span className="badge-maroon px-4 py-1.5 text-sm">{isAdmin ? 'Super Admin' : 'Customer Profile'}</span>
        </div>
      </div>

      {/* Admin Specific Statistics */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Orders', value: allOrders.length, increase: '' },
            { label: 'Lifetime Revenue', value: formatPrice(totalRevenue), increase: '' },
            { label: 'Active Sessions', value: '1,204', increase: '+18%' },
            { label: 'Pending Delivery', value: allOrders.filter(o => o.status === 'Processing').length, increase: '' },
          ].map(stat => (
            <div key={stat.label} className="card p-8 border-t-2 border-t-brand-500 shadow-md">
              <h3 className="font-serif text-gray-500 text-sm font-semibold tracking-widest uppercase mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              {stat.increase && <span className="text-xs text-brand-600 font-bold bg-brand-50 px-2.5 py-1 rounded-sm mt-3 inline-block">{stat.increase}</span>}
            </div>
          ))}
        </div>
      )}

      <h2 className="font-serif text-2xl tracking-wide text-gray-800 mb-6">
        {isAdmin ? 'System Tracking & Fulfillment' : 'Order History & Tracking'}
      </h2>
      
      {loading ? (
        <div className="text-center py-20"><p className="text-gray-400 font-serif italic text-lg opacity-60">Syncing with Live Database...</p></div>
      ) : displayOrders.length === 0 ? (
        <div className="text-center py-20 card"><p className="text-gray-400 font-serif italic text-lg">No orders found on your account.</p></div>
      ) : (
        <div className="space-y-8">
          {displayOrders.map((order, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={order.id || order.orderId} className="card p-8 bg-white border border-gray-100 shadow-sm"
            >
              <div className="flex flex-wrap justify-between items-start border-b border-gray-100 pb-5 mb-5">
                <div>
                  <h3 className="font-mono text-xl font-bold text-gray-800 mb-1">{order.orderId || order.id}</h3>
                  <p className="text-sm text-gray-500 font-serif tracking-wide">{new Date(order.date).toLocaleString()} • {order.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-brand-600 mb-1">{formatPrice(order.total)}</p>
                  <span className="px-4 py-1.5 bg-gray-900 text-brand-400 rounded-none text-xs font-bold uppercase tracking-widest">{order.status}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Masterpieces Enclosed</p>
                <div className="flex flex-wrap gap-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 px-4 py-2 border border-gray-200">
                      <div className="w-10 h-10 bg-gray-200 overflow-hidden"><img src={item.image} alt="jewelry" className="w-full h-full object-cover" /></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fulfillment Timeline */}
              <div>
                 <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Tracking Timeline</p>
                 <div className="relative border-l-2 border-brand-200 ml-3 space-y-6">
                    {order.timeline?.map((event, idx) => (
                      <div key={idx} className="relative pl-8">
                         <div className="absolute w-4 h-4 rounded-full bg-brand-500 border-4 border-white shadow-sm -left-[9px] top-1"></div>
                         <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{event.status}</h4>
                         <p className="text-xs font-mono text-brand-600 mb-1">{new Date(event.timestamp).toLocaleString()}</p>
                         <p className="text-sm text-gray-500 font-serif italic">{event.details}</p>
                      </div>
                    ))}
                    {/* Visual Padder for realism if only 1 event exists */}
                    {order.timeline?.length === 1 && (
                      <div className="relative pl-8 opacity-40">
                         <div className="absolute w-3 h-3 rounded-full bg-gray-300 border-2 border-white -left-[7px] top-1.5"></div>
                         <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Awaiting Verification & Packaging</h4>
                         <p className="text-sm text-gray-400 font-serif italic mt-1">Our artisans will begin preparing your order securely.</p>
                      </div>
                    )}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
