import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { Camera, X, RotateCcw, Move, Maximize, Loader2, Info } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ARTryOn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const imageUrl = searchParams.get('img') || "https://raw.githubusercontent.com/SatyawanPanchal/roshni_creations_assets_ssh01/main/assets/01/product-001-1.webp";
  const category = searchParams.get('cat') || "necklace";

  const [loading, setLoading] = useState(true);
  const [posX, setPosX] = useState(50); // percentage
  const [posY, setPosY] = useState(60); // percentage
  const [scale, setScale] = useState(0.4);
  const [isCapturing, setIsCapturing] = useState(false);

  const webcamRef = useRef(null);

  useEffect(() => {
    // Neural positioning defaults
    if (category === 'earrings') {
      setPosY(45);
      setScale(0.15);
    } else if (category === 'watch') {
      setPosY(75); // Lower frame for wrist placement
      setPosX(50); 
      setScale(0.20);
    } else if (category === 'mangalsutra') {
      setPosY(65);
      setScale(0.35);
    }
  }, [category]);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 200);
    // In a real app, capture screenshot logic here
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-md border border-primary/30">
               <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
               <h1 className="text-white font-bold text-sm tracking-tight">Virtual Try-On</h1>
               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Roshni AR Engine</p>
            </div>
         </div>
         <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X className="w-6 h-6 text-white" />
         </button>
      </div>

      {/* Camera Feed */}
      <div className="relative w-full h-full flex items-center justify-center">
        {loading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Initializing Optics...</p>
           </div>
        )}
        
        <Webcam 
          ref={webcamRef}
          onUserMedia={() => setLoading(false)}
          videoConstraints={{ facingMode: "user", aspectRatio: 9/16 }}
          className="h-full w-full object-cover grayscale-[0.2]"
        />

        {/* The Jewellery Overlay */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: scale }}
            style={{ 
               left: `${posX}%`, 
               top: `${posY}%`,
               translateX: '-50%',
               translateY: '-50%'
            }}
            className="absolute z-20 pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
             <img 
               src={imageUrl} 
               alt="AR Overlay" 
               className="max-w-[400px] w-full"
             />
          </motion.div>
        )}

        {/* Capture Flash */}
        <AnimatePresence>
           {isCapturing && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-white z-[60]"
             />
           )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {!loading && (
        <div className="absolute bottom-10 left-0 right-0 p-6 flex flex-col items-center gap-6">
           {/* Guidance */}
           <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 mb-4">
              <Info className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-gray-300 font-medium uppercase tracking-widest">
                {category === 'watch' ? 'Position your wrist in the frame' : category === 'earrings' ? 'Position your ears in the center' : 'Position your neck in the center'}
              </span>
           </div>

           <div className="flex items-center gap-8">
              <button 
                onClick={() => { setPosX(50); setPosY(60); setScale(0.4); }}
                className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"
              >
                 <RotateCcw className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleCapture}
                className="w-20 h-20 bg-white rounded-full p-1.5 border-4 border-white/20 active:scale-90 transition-transform"
              >
                 <div className="w-full h-full bg-white rounded-full border-2 border-black/10"></div>
              </button>

              <div className="flex flex-col gap-2">
                 <button onClick={() => setScale(s => s + 0.05)} className="p-3 bg-white/10 rounded-full text-white">+</button>
                 <button onClick={() => setScale(s => s - 0.05)} className="p-3 bg-white/10 rounded-full text-white">-</button>
              </div>
           </div>

           {/* Manual Move Controls (Visual Sliders) */}
           <div className="w-full max-w-xs space-y-4">
              <div className="flex items-center gap-4">
                 <Move className="w-4 h-4 text-gray-500" />
                 <input 
                   type="range" 
                   min="0" max="100" value={posY}
                   onChange={(e) => setPosY(parseInt(e.target.value))}
                   className="flex-1 accent-primary bg-white/20 h-1 rounded-full appearance-none cursor-pointer"
                 />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ARTryOn;
