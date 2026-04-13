const Footer = () => {
  return (
    <footer className="bg-surface py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Roshni Creations</h3>
          <p className="text-sm text-gray-400">
            Elevating elegance with AI-powered personalized jewellery and premium craftsmanship.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
             <li><a href="/products" className="hover:text-primary transition-colors">Shop</a></li>
             <li><a href="/ai-stylist" className="hover:text-primary transition-colors">AI Stylist</a></li>
             <li><a href="/reels" className="hover:text-primary transition-colors">Reels</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/verify-certificate" className="hover:text-primary transition-colors">Certificate Verify</a></li>
            <li><a href="/profile" className="hover:text-primary transition-colors">My Profile</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
             <li>Privacy Policy</li>
             <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10 flex justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Roshni Creations. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
