import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCpu, FiStar, FiUser } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';

const AIStylist = () => {
  const [messages, setMessages] = useState([
    {
       role: 'assistant',
       text: 'Hello! I am your personal Roshni AI Stylist. Tell me what you are looking for today! (e.g. "I need a wedding mangalsutra" or "Show me some luxury watches")',
       products: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inventory, setInventory] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchProducts().then(data => setInventory(data));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input, products: [] }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay for realism
    setTimeout(() => {
       // Semantic Alias Mapping
       let searchTokens = userMessage.toLowerCase();
       searchTokens = searchTokens.replace('chain', 'necklace');
       searchTokens = searchTokens.replace('ring', 'rings');
       searchTokens = searchTokens.replace('bridal', 'mangalsutra wedding');

       // Deep Keyword Extraction Logic
       const foundProducts = inventory.filter(p => {
          const matchTarget = (p.name + " " + p.category + " " + p.description).toLowerCase();
          // Extract meaningful keywords
          const words = searchTokens.split(' ').filter(w => w.length > 2);
          if (words.length === 0 && matchTarget.includes(searchTokens)) return true;
          return words.some(word => matchTarget.includes(word));
       });

       let responseText = "";
       let finalProducts = [];

       if (userMessage.includes("hello") || userMessage.includes("hi")) {
          responseText = "Hi there! I'm ready to find the perfect jewelry piece for your collection. What's the occasion?";
       } else if (foundProducts.length > 0) {
          // Shuffle and pick top 4 matches
          finalProducts = foundProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
          responseText = `I analyzed our master vault and found these stunning pieces perfectly tailored to your request! Let me know if you want to see anything else.`;
       } else {
          responseText = "I couldn't find exactly what you were describing in our current collection, but we are constantly crafting new pieces. Could you try describing the style or category (like 'Choker' or 'Watch')?";
       }

       setMessages(prev => [...prev, { 
          role: 'assistant', 
          text: responseText, 
          products: finalProducts 
       }]);
       setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="text-center mb-6 shrink-0">
         <FiCpu size={36} className="mx-auto text-brand-500 mb-2" />
         <h1 className="font-serif text-3xl font-bold text-gray-900">Conversational AI Stylist</h1>
         <p className="text-gray-500 text-sm">Powered by Roshni Intelligence Engine.</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gray-50/50 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-y-auto p-4 md:p-8 space-y-6 shadow-inner">
         {messages.map((msg, idx) => (
            <motion.div 
               initial={{ opacity: 0, y: 10 }} 
               animate={{ opacity: 1, y: 0 }} 
               key={idx} 
               className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
               <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-brand-100 text-brand-600'}`}>
                     {msg.role === 'user' ? <FiUser size={14} /> : <FiStar size={14} />}
                  </div>

                  {/* Message Bubble + Products */}
                  <div className="flex flex-col gap-3">
                     <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-gray-900 text-white rounded-tr-sm' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                     }`}>
                        {msg.text}
                     </div>

                     {/* Recommended Products Inline */}
                     {msg.products && msg.products.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                           {msg.products.map(p => (
                              <div key={p.id} className="w-full max-w-[220px]">
                                <ProductCard product={p} />
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>
         ))}

         {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="flex gap-3 max-w-[80%] flex-row">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                     <FiStar size={14} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm flex gap-1 items-center">
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
               </div>
            </motion.div>
         )}
         
         <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="mt-4 shrink-0 relative flex items-center">
         <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI Stylist anything... (e.g. 'Find me a gold watch')"
            className="w-full bg-white border border-gray-300 rounded-full py-4 pl-6 pr-16 shadow-sm focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
         />
         <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
         >
            <FiSend size={16} className="-ml-0.5" />
         </button>
      </form>

    </div>
  );
};

export default AIStylist;
