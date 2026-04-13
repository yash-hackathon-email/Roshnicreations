import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, ShoppingBag, Music2, Pause, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReelCard = ({ reel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    }, options);

    if (videoRef.current) observer.observe(videoRef.current);
    return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full h-full snap-start relative bg-black overflow-hidden flex items-center justify-center">
      <video 
        ref={videoRef}
        src={reel.videoUrl}
        loop
        playsInline
        className="h-full w-full object-cover"
        onClick={togglePlay}
        muted
      />

      {/* Play/Pause Overlay Indicator */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute z-20 pointer-events-none"
          >
             <Play className="w-16 h-16 text-white/50 fill-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right side actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-7 z-10 text-white">
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setLiked(!liked)}>
          <div className="bg-black/20 p-3 rounded-full backdrop-blur-md group-active:scale-90 transition-transform">
            <Heart className={`w-7 h-7 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </div>
          <span className="text-[10px] font-bold drop-shadow-lg">{reel.likes}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="bg-black/20 p-3 rounded-full backdrop-blur-md">
            <MessageCircle className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold drop-shadow-lg">{reel.comments}</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="bg-black/20 p-3 rounded-full backdrop-blur-md">
            <Share2 className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold drop-shadow-lg">Share</span>
        </div>
        
        <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden animate-spin-slow">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Roshni" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Bottom Info & Tag */}
      <div className="absolute left-4 bottom-8 right-20 z-10 space-y-4">
        <div className="flex items-center gap-2">
           <h3 className="text-white font-bold text-sm">@roshni_creations</h3>
           <span className="bg-primary text-black text-[9px] font-bold px-1.5 py-0.5 rounded">Follow</span>
        </div>
        
        <p className="text-white/90 text-[13px] leading-snug drop-shadow-md pr-4">{reel.description}</p>
        
        <div className="flex items-center gap-2 text-white/80 text-[11px]">
           <Music2 className="w-3.5 h-3.5 animate-pulse" />
           <span className="overflow-hidden whitespace-nowrap">Original Audio - Roshni Masterpiece</span>
        </div>

        {/* Product Tag */}
        <motion.div 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           onClick={() => navigate(`/product/${reel.productId}`)}
           className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl flex items-center justify-between cursor-pointer group hover:bg-white/20 transition-all shadow-2xl"
        >
           <div className="flex items-center gap-3">
             <div className="w-11 h-11 bg-black rounded-lg overflow-hidden border border-white/10">
               <img src={reel.productImage || "https://images.unsplash.com/photo-1599643478524-fb66f7f2b1a6?auto=format&fit=crop&q=80&w=100"} className="w-full h-full object-cover" />
             </div>
             <div>
                <p className="text-[11px] font-bold text-white mb-0.5 line-clamp-1">{reel.productName}</p>
                <div className="flex items-center gap-2">
                   <span className="text-[11px] font-bold text-primary">₹{reel.productPrice.toLocaleString('en-IN')}</span>
                   <span className="text-[9px] text-gray-400 font-medium">View Design</span>
                </div>
             </div>
           </div>
           <div className="bg-primary p-2 rounded-lg group-hover:bg-yellow-500 transition-colors">
              <ShoppingBag className="w-4 h-4 text-black" />
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReelCard;
