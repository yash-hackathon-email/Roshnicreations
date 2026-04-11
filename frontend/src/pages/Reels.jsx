import { useState, useRef, useEffect } from 'react';
import { FiHeart, FiShare2, FiShoppingCart, FiMoreVertical, FiMusic } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const encodeSpace = (str) => str.replace(/ /g, '%20');

const MOCK_REELS = [
  { id: 1, videoUrl: "/" + encodeSpace("From KlickPin CF The best quality Render! _ Fancy jewelry necklace Diamond earrings design Diamond pendants designs.mp4"), product: { id: "p1", name: "Jadau Bridal Necklace", price: 450000, category: "necklace", image: "https://images.unsplash.com/photo-1599643478514-4a4be12976b4?w=200" }, likes: 1204, caption: "Crafting the perfect wedding ensemble. #BridalJewelry #RoshniCreations" },
  { id: 2, videoUrl: "/" + encodeSpace("From KlickPin CF The best quality Render! _ Fancy jewelry necklace Diamond earrings design Diamond pendants designs (1).mp4"), product: { id: "p2", name: "Solitaire Diamond Ring", price: 215000, category: "rings", image: "https://images.unsplash.com/photo-1605100804763-247f6612d543?w=200" }, likes: 853, caption: "Elegance that speaks for itself. She said YES! 💍✨" },
  { id: 3, videoUrl: "/" + encodeSpace("From KlickPin CF Build these clever spring garden ideas that look high-end but stay practical with practical inspiration you can use right away — save this for later - Pin-30610472461905048.mp4"), product: { id: "p3", name: "Premium Bridal Watch", price: 65000, category: "watch", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200" }, likes: 2199, caption: "Gleam boldly entirely handcrafted by our master artisans." },
  { id: 4, videoUrl: "/" + encodeSpace("From KlickPin CF From beginner to obsessed Build these beautiful cottage garden ideas that bring style function and personality together with realistic ideas for - Pin-703756187488303.mp4"), product: { id: "p4", name: "Moon Mangalsutra", price: 85000, category: "mangalsutra", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200" }, likes: 3105, caption: "True tradition meets contemporary aesthetic." },
];

const ReelVideo = ({ reel, isActive }) => {
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

  const handleAddToCart = () => {
    const p = { ...reel.product, category: 'reel-product', stock: 10, quantity: 1 };
    addItem(p);
  };

  return (
    <div className="relative w-full h-[calc(100vh-60px-64px)] min-h-[500px] snap-always snap-center bg-black overflow-hidden group">
        <video 
          ref={videoRef}
          src={reel.videoUrl} 
          loop 
          playsInline
          muted // By default muted block browser constraints
          onClick={toggleMute}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />

        {/* Right Interaction Bar */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10 text-white">
          <button onClick={() => setLiked(!liked)} className="flex flex-col items-center group/btn">
            <div className={`p-3 rounded-full transition-colors ${liked ? 'bg-red-500' : 'bg-black/40 border border-white/20 hover:bg-white/20'}`}>
              <FiHeart size={24} className={liked ? 'fill-white' : ''} />
            </div>
            <span className="text-xs font-bold mt-1.5 drop-shadow-md">{liked ? reel.likes + 1 : reel.likes}</span>
          </button>
          
          <button onClick={() => toast.success("Link copied to clipboard!")} className="flex flex-col items-center group/btn">
            <div className="p-3 bg-black/40 rounded-full hover:bg-white/20 transition-colors border border-white/20">
              <FiShare2 size={24} />
            </div>
            <span className="text-xs font-bold mt-1.5 drop-shadow-md">Share</span>
          </button>

          <button className="flex flex-col items-center group/btn">
            <div className="p-3 bg-black/40 rounded-full hover:bg-white/20 transition-colors border border-white/20">
              <FiMoreVertical size={24} />
            </div>
          </button>

          <div className="mt-4 animate-spin-slow rounded-full border-2 border-dashed border-gray-400 p-1">
             <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${reel.product.image})`}}></div>
          </div>
        </div>

        {/* Bottom Description & Shopping Ribbon */}
        <div className="absolute bottom-6 left-4 right-20 z-10 text-white">
           <h3 className="font-bold text-lg mb-1 tracking-wide flex items-center gap-2">@roshni_creations <span className="bg-brand-500 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest text-white">Verified</span></h3>
           <p className="text-sm text-gray-200 mb-4 line-clamp-2">{reel.caption}</p>
           
           <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 opacity-80">
              <FiMusic /> <marquee className="w-32">Original Audio - Roshni Masterpieces</marquee>
           </div>

           <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-3">
                 <img src={reel.product.image} className="w-10 h-10 rounded-md object-cover border border-white/30" />
                 <div>
                    <p className="font-bold text-[11px] uppercase tracking-wider text-white line-clamp-1">{reel.product.name}</p>
                    <p className="text-gold-400 font-bold text-xs mt-0.5">₹{reel.product.price.toLocaleString('en-IN')}</p>
                 </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => window.location.href=`/try-on?img=${encodeURIComponent(reel.product.image)}&cat=${reel.product.category}`} className="bg-white/20 text-white hover:bg-white/30 py-2 px-3 rounded-lg font-bold flex items-center gap-2 transition-colors max-h-[38px] text-[10px] sm:text-xs">
                  TRY AR
                </button>
                <button onClick={handleAddToCart} className="bg-brand-500 hover:bg-brand-600 transition-colors text-white py-2 px-3 rounded-lg font-bold flex items-center gap-2 max-h-[38px]">
                   <FiShoppingCart size={16} /> 
                </button>
              </div>
           </div>
        </div>
    </div>
  );
};

const Reels = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 } // Video plays when at least 60% is visible
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach(child => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="bg-black w-full min-h-screen">
       <div 
         ref={containerRef} 
         className="w-full max-w-md mx-auto h-[calc(100vh-60px-64px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-gray-900 border-x border-white/10"
         style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
       >
         {MOCK_REELS.map((reel, index) => (
           <div key={reel.id} data-index={index}>
              <ReelVideo reel={reel} isActive={activeIndex === index} />
           </div>
         ))}
       </div>
    </div>
  );
};

export default Reels;
