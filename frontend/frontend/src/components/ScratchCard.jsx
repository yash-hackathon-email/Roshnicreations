import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Trophy } from 'lucide-react';

const ScratchCard = ({ onCoupon }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fill with gold scratchable layer
    ctx.fillStyle = '#C5A059'; // A duller gold for the scratch layer
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add texture
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const getScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    return (transparentPixels / (canvas.width * canvas.height)) * 100;
  };

  const handleScratch = (e) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    
    const percentage = getScratchPercentage();
    setScratchPercentage(percentage);
    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
      if(onCoupon) onCoupon({ code: 'RSH-FIRST-15', type: 'percent', discount: 15 });
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[16/9] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
      {/* Revealed Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-gold-500/20 to-white">
         <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-gold-500/20">
            <Trophy className="w-8 h-8 text-white" />
         </div>
         <h3 className="text-2xl font-bold text-gray-800 mb-1">RSH-FIRST-15</h3>
         <p className="text-gold-600 font-bold text-sm tracking-widest">15% OFF ON FIRST PURCHASE</p>
         <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <Sparkles className="w-3 h-3 text-gold-500" /> Valid for 7 days
         </div>
      </div>

      {/* Scratch Layer */}
      <canvas
        ref={canvasRef}
        width={400}
        height={225}
        onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
        onTouchMove={handleScratch}
        className={`absolute inset-0 z-10 cursor-pointer transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {!isRevealed && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
           <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-3">
              <Gift className="w-5 h-5 text-gold-500" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Scratch your reward</span>
           </div>
        </div>
      )}

      {/* Progress Indicator */}
      {scratchPercentage > 0 && !isRevealed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-black/60 rounded-full text-[8px] text-white uppercase tracking-widest">
           Unveiling: {Math.round(scratchPercentage)}%
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
