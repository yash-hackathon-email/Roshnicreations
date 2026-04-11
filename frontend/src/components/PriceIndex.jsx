import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, Info } from 'lucide-react';

const MetalPriceTicker = () => {
  const [prices, setPrices] = useState([
    { metal: 'Gold 24K', price: '152356', unit: '10g', change: '+₹150', up: true },
    { metal: 'Gold 22K', price: '142100', unit: '10g', change: '-₹40', up: false },
    { metal: 'Silver',   price: '240472', unit: '1kg', change: '+₹400', up: true },
  ]);

  // Simulate subtle real-time market drift
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(p => {
        const drift = Math.floor((Math.random() - 0.5) * 80);
        const newPrice = parseInt(p.price) + drift;
        return {
          ...p,
          price: newPrice.toString(),
          change: `${drift > 0 ? '+' : ''}₹${Math.abs(drift)}`,
          up: drift >= 0
        };
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const TickerItems = () => (
    <>
      <div className="flex items-center gap-2 pr-6 border-r border-white/20 mr-6">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
           <Clock className="w-3.5 h-3.5 text-brand-500 animate-pulse" /> Live Rates
        </span>
      </div>
      {prices.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 whitespace-nowrap mr-8">
           <span className="text-[11px] font-bold text-white uppercase tracking-tighter">{item.metal}</span>
           <span className="text-[11px] font-mono font-bold text-brand-300">
             ₹{parseInt(item.price).toLocaleString('en-IN')}/{item.unit}
           </span>
           <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${item.up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.change}
           </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="bg-black/95 backdrop-blur-xl border-b border-white/10 py-3 overflow-hidden flex items-center w-full">
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee pl-4 cursor-pointer">
             <TickerItems />
             <TickerItems />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[9px] text-gray-500 hover:text-white transition-colors cursor-pointer px-6 border-l border-white/10 bg-black/95 z-20">
           <Info className="w-3 h-3" />
           <span className="uppercase tracking-widest font-bold">Pricing Policy</span>
        </div>
      </div>
    </>
  );
};

export default MetalPriceTicker;
