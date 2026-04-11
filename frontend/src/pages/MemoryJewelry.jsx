import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MemoryJewelry = () => {
  const [file, setFile] = useState(null);
  const [engraving, setEngraving] = useState('');
  const [metal, setMetal] = useState('gold');
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file && !engraving) return toast.error("Please explicitly provide a photo or engraving.");

    const customProduct = {
      id: "mem_" + Date.now(),
      name: `Custom ${metal.charAt(0).toUpperCase() + metal.slice(1)} Memory Piece`,
      price: metal === 'gold' ? 85000 : metal === 'silver' ? 12000 : 8000,
      category: 'custom',
      stock: 1,
      isCustom: true,
      engraving,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" // Simulated render
    };

    addItem(customProduct);
    toast.success("Added Custom Design to Cart!");
    navigate('/cart');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="section-title text-maroon-700">Memory & Engraved Jewelry</h1>
      <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">Transform your cherished memories or important dates into wearable art. Upload your photo or text, and we will intricately craft it.</p>
      
      <div className="card p-8 border-t-4 border-gold-500">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">1. Upload Memory Photo (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
               <input type="file" onChange={(e) => setFile(e.target.files[0])} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gold-500 file:text-white hover:file:bg-gold-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">2. Custom Engraving (Optional)</label>
            <input type="text" maxLength={20} value={engraving} onChange={e => setEngraving(e.target.value)} placeholder="e.g. 'A & B - 24.10.2023'" className="input-field font-serif italic text-lg" />
            <span className="text-xs text-gray-400 mt-1 block">Max 20 characters</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">3. Select Metal Base</label>
            <div className="flex gap-4">
               {['gold', 'silver', 'rose-gold'].map(m => (
                 <label key={m} className={`flex-1 border-2 rounded-lg p-4 cursor-pointer text-center capitalize font-semibold transition-all ${metal === m ? 'border-maroon-500 bg-maroon-50 text-maroon-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                   <input type="radio" name="metal" value={m} checked={metal === m} onChange={() => setMetal(m)} className="hidden" />
                   {m.replace('-', ' ')}
                 </label>
               ))}
            </div>
          </div>

          <button type="submit" className="btn-gold w-full py-4 text-lg font-bold shadow-xl shadow-gold-500/30">
            Design & Add To Cart (est. ₹{metal === 'gold' ? '85,000' : metal === 'silver' ? '12,000' : '8,000'})
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemoryJewelry;
