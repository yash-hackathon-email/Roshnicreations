import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "https://images.unsplash.com/photo-1599643478524-fb66f7f2b1a6?auto=format&fit=crop&q=80&w=600";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative cursor-pointer bg-surface rounded-none overflow-hidden border border-gray-100 hover:border-brand-500/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-brand-500/10"
    >
      <Link to={`/products/${product.id}`}>
        <div className="w-full aspect-[4/5] bg-gray-50 overflow-hidden relative">
          <img 
            src={displayImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.isFeatured && (
             <div className="absolute top-4 left-4 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md shadow-brand-500/30">
               Signature
             </div>
          )}
        </div>
        <div className="p-5 text-center bg-surface">
          <h3 className="text-sm font-serif text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-1 truncate px-2">{product.name}</h3>
          <div className="w-8 h-[1px] bg-brand-500/50 mx-auto my-3"></div>
          <span className="text-md font-bold text-gray-900 tracking-wide font-sans">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
