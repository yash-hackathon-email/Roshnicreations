import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Gem, Menu, Home, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* -------------------- DESKTOP TOP NAVBAR -------------------- */}
      <nav className="hidden md:block w-full bg-background/95 backdrop-blur-md border-b border-brand-200/50 shadow-sm relative z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src="https://raw.githubusercontent.com/SatyawanPanchal/roshni_creations_assets_ssh01/main/assets/RoshniCreationsLogo.webp" alt="Roshni Creations Logo" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] object-contain drop-shadow-lg" />
              <span className="text-[1.35rem] font-serif tracking-widest uppercase font-bold text-gray-900 drop-shadow-sm">Roshni Creations</span>
            </Link>

            <div className="flex items-baseline space-x-8">
              <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-brand-600 transition-colors">Collections</Link>
              <Link to="/ai-stylist" className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-brand-600 transition-colors">AI Stylist</Link>
              <Link to="/reels" className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-brand-600 transition-colors">Reels</Link>
              <Link to="/memory-jewelry" className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-brand-600 transition-colors">Customize</Link>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/cart">
                <motion.button whileHover={{ scale: 1.05 }} className="text-gray-600 hover:text-brand-600 relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
                      {cartItems.length}
                    </span>
                  )}
                </motion.button>
              </Link>
              <Link to={user ? "/admin" : "/login"}>
                <User className={`w-5 h-5 ${user ? 'text-brand-500 fill-brand-50/20' : 'text-gray-600 hover:text-brand-600'}`} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* -------------------- MOBILE BOTTOM APP BAR -------------------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-brand-200/50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-1">
        <div className="flex justify-between items-center h-[60px] px-6">
          
          {/* Home */}
          <Link to="/" className={`flex flex-col items-center justify-center space-y-1 w-12 ${isActive('/') ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <Home className={`w-5 h-5 ${isActive('/') ? 'fill-brand-50/50' : ''}`} strokeWidth={isActive('/') ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
          </Link>

          {/* Shop */}
          <Link to="/products" className={`flex flex-col items-center justify-center space-y-1 w-12 ${isActive('/products') ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <Layers className={`w-5 h-5 ${isActive('/products') ? 'fill-brand-50/50' : ''}`} strokeWidth={isActive('/products') ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Shop</span>
          </Link>

          {/* Reels */}
          <Link to="/reels" className={`flex flex-col items-center justify-center space-y-1 w-12 ${isActive('/reels') ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <Sparkles className={`w-5 h-5 ${isActive('/reels') ? 'fill-brand-50/50' : ''}`} strokeWidth={isActive('/reels') ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Reels</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={`relative flex flex-col items-center justify-center space-y-1 w-12 ${isActive('/cart') ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <div className="relative">
              <ShoppingCart className={`w-5 h-5 ${isActive('/cart') ? 'fill-brand-50/50' : ''}`} strokeWidth={isActive('/cart') ? 2.5 : 2} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-maroon-600 text-white text-[8px] font-bold w-[14px] h-[14px] rounded-full flex items-center justify-center border border-background shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Cart</span>
          </Link>

          {/* Profile */}
          <Link to={user ? "/admin" : "/login"} className={`flex flex-col items-center justify-center space-y-1 w-12 ${isActive('/admin') || isActive('/login') ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <User className={`w-5 h-5 ${isActive('/admin') || isActive('/login') ? 'fill-brand-50/50' : ''}`} strokeWidth={(isActive('/admin') || isActive('/login')) ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{user ? 'Account' : 'Login'}</span>
          </Link>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
