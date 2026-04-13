import React from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor } from 'react-icons/fi';

const AIRecommendation = () => {
  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <FiMonitor size={48} className="mx-auto text-amber-500 mb-4" />
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">Try Our AI Stylist</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Not sure what suits you best? Upload your photo or describe your outfit, and our AI stylist will powerfully recommend matching jewellery pieces tailored just for you.</p>
        <Link to="/ai-stylist" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors">Try AI Stylist Now</Link>
      </div>
    </section>
  );
};

export default AIRecommendation;
