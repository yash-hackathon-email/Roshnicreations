import { useState } from 'react';
import { Shield, CheckCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId) return;
    
    // Mocking verification process
    setTimeout(() => {
      setResult({
        id: certId,
        valid: true,
        metal: '18K Authentic Gold',
        gemstone: 'Grade VVS1 Diamond',
        purchased: '2026-10-14'
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Shield className="w-16 h-16 text-brand-500 mx-auto mb-6" />
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4 tracking-wide">Authenticity Verification</h1>
        <p className="text-gray-600 font-light max-w-xl mx-auto">
          Enter your unique certificate ID to instantly verify the hallmark purity, gemstone grades, and exact metallurgical specifications of your Roshni Creations masterpiece.
        </p>
      </motion.div>

      <form onSubmit={handleVerify} className="max-w-xl mx-auto mb-16 relative">
        <input
          type="text"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          placeholder="e.g. RSH-884-X9"
          className="w-full bg-surface border-2 border-brand-200/50 text-gray-800 px-6 py-4 rounded-none focus:outline-none focus:border-brand-500 transition-colors placeholder:text-gray-400 font-mono text-center tracking-widest text-lg shadow-sm"
        />
        <button type="submit" className="mt-6 w-full btn-gold shadow-lg shadow-brand-500/20">
          Verify Certificate
        </button>
      </form>

      {result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-50/50 border border-brand-200 p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <CheckCircle className="text-green-600 w-8 h-8" />
            <h2 className="text-2xl font-serif font-bold text-gray-900 uppercase tracking-widest">Verified Masterpiece</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 delimiter">
            {[
              { label: 'Certificate ID', val: result.id },
              { label: 'Primary Metal', val: result.metal },
              { label: 'Gemstone Profile', val: result.gemstone },
              { label: 'Date Authenticated', val: result.purchased },
            ].map(item => (
              <div key={item.label} className="text-center">
                <span className="block text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">{item.label}</span>
                <span className="block font-mono text-gray-800">{item.val}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VerifyCertificate;
