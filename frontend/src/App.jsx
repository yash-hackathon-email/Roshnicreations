import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import PriceIndex from './components/PriceIndex';

// Pages
import Home from './pages/Home';
import Products from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import MemoryJewelry from './pages/MemoryJewelry';
import Reels from './pages/Reels';
import AdminDashboard from './pages/AdminDashboard';
import AIStylist from './pages/AIStylist';
import ARTryOn from './components/ARTryOn'; // It is a component that can be act as page

import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-brand-500 selection:text-white pb-[72px] md:pb-0">
            <div className="sticky top-0 z-[60] w-full flex flex-col">
              <Navbar />
            </div>
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#1c1917', color: '#fff', borderRadius: '0' } }} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/ai-stylist" element={<AIStylist />} />
                <Route path="/try-on" element={<ARTryOn />} />
                <Route path="/memory-jewelry" element={<MemoryJewelry />} />
                <Route path="/verify-certificate" element={<VerifyCertificate />} />
                
                {/* Protected Routes */}
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                
                {/* Admin/User Order Dashboard Route */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
