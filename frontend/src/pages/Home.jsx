import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchProducts } from '../services/productService'
import ProductCard    from '../components/ProductCard'
import AIRecommendation from '../components/AIRecommendation'
import ScratchCard    from '../components/ScratchCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'
import { GiNecklace, GiDiamondRing } from 'react-icons/gi'
import { CATEGORIES } from '../utils/constants'
import toast from 'react-hot-toast'
import PriceIndex from '../components/PriceIndex'

const FEATURES = [
  { icon: FiTruck,     title: 'Free Shipping',        desc: 'On orders above ₹999'     },
  { icon: FiShield,    title: '100% Authentic',       desc: 'Certified Hallmarked'     },
  { icon: FiRefreshCw, title: 'Easy Returns',         desc: '15-day money-back'        },
  { icon: FiStar,      title: 'Premium Quality',      desc: 'Lifetime warranty'        },
]

const GLB_MODELS = [
  "/diamond_ring_3d_print_ready.glb",
  "/ring_gold_with_diamond.glb",
  "/ring_silver_with_black_cristal.glb"
];

const TESTIMONIALS = [
  { name: 'Priya Sharma',    city: 'Jaipur',     text: 'Absolutely love my Kundan choker! The craftsmanship is superb.', rating: 5,   img: 'https://i.pravatar.cc/60?img=47' },
  { name: 'Ananya Verma',    city: 'Delhi',      text: 'The bridal set I ordered exceeded all my expectations!',         rating: 5,   img: 'https://i.pravatar.cc/60?img=44' },
  { name: 'Sunita Patel',    city: 'Ahmedabad',  text: 'Beautiful packaging, even more beautiful jewellery.',             rating: 4.5, img: 'https://i.pravatar.cc/60?img=48' },
]

const Home = () => {
  const [products,  setProducts]  = useState([])
  const [featured,  setFeatured]  = useState([])
  const [loading,   setLoading]   = useState(true)
  const [activecat, setActiveCat] = useState('all')
  const [currentGLBIdx, setCurrentGLBIdx] = useState(0)

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setFeatured(data.filter(p => p.isFeatured))
      setLoading(false)
    })
  }, [])

  const filtered = activecat === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.category === activecat).slice(0, 8)

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black">
          <video 
             src="/bg%20video.mp4" 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <GiNecklace className="text-brand-400" size={24} />
              <span className="text-brand-300 text-xs font-bold tracking-[0.2em] uppercase">Elegance Redefined</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-md">
              Timeless Beauty,<br />
              <span className="italic font-light text-brand-400 drop-shadow-md">Modern Grace.</span>
            </h1>
            
            <p className="text-lg text-gray-200 mb-10 max-w-md leading-relaxed font-sans drop-shadow-sm">
              Discover exquisitely handcrafted masterpieces featuring custom AR try-ons and authentic precious materials.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-gold flex items-center gap-2 text-sm px-10 py-4 shadow-xl shadow-brand-500/20 text-black">
                Explore Collection <FiArrowRight />
              </Link>
              <Link to="/ai-stylist" className="px-8 py-4 border border-white/30 text-white hover:border-brand-400 flex items-center gap-2 text-sm transition-all hover:bg-white/10 backdrop-blur-sm">
                <GiDiamondRing /> AI Stylist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Market Ticker */}
      <div className="w-full relative z-20 shadow-2xl">
         <PriceIndex />
      </div>

      {/* Features bar */}
      <section className="bg-gold-50 border-y border-gold-200 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={f.title} 
                className="flex items-center gap-4 text-gold-900"
              >
                <div className="p-3 bg-white rounded-none border border-gold-200">
                  <Icon size={20} className="text-gold-600 flex-shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-widest text-gold-900 mb-1">{f.title}</p>
                  <p className="text-gold-600 text-xs font-serif italic">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Featured Collection</h2>
          <div className="gold-divider" />

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                  activecat === c.id
                    ? 'bg-gold-500 text-white border-gold-500 shadow-md'
                    : 'border-gray-300 text-gray-600 hover:border-gold-400'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner message="Loading collection…" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" className="btn-outline-gold inline-flex items-center gap-2 px-8 py-3">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

       {/* 3D Masterpiece Interactive Gallery */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden border-y border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
           
           <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 to-transparent rounded-full blur-3xl opacity-50"></div>
              <div className="w-full h-[400px] md:h-[500px] relative z-10">
                 <model-viewer 
                    src={GLB_MODELS[currentGLBIdx]} 
                    alt="3D Interactive Diamond Ring" 
                    auto-rotate 
                    camera-controls 
                    shadow-intensity="1.5" 
                    exposure="1.2"
                    interaction-prompt="always"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', outline: 'none' }}
                 ></model-viewer>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] text-white tracking-widest font-bold uppercase z-20">
                 360° Interactive View
              </div>
           </div>

           <div className="flex-1 text-center md:text-left text-white max-w-lg">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                 <GiDiamondRing size={20} className="text-brand-500" />
                 <span className="text-brand-400 font-bold tracking-[0.2em] uppercase text-xs">Examine The Cut</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">Interact in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">3D Space</span></h2>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">Drag to rotate. Pinch to zoom in. Examine every hyper-realistic facet of our authentic jewelry natively inside your browser. Experience true luxury before you commit.</p>
              
              <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                 <button onClick={() => setCurrentGLBIdx(p => (p + 1) % GLB_MODELS.length)} className="btn-gold px-8 py-3 w-full sm:w-auto shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]">
                   View Next Geometry ({currentGLBIdx + 1}/3)
                 </button>
                 <button className="px-8 py-3 bg-white/5 hover:bg-brand-500/10 border border-white/20 hover:border-brand-500 transition-all font-bold uppercase tracking-widest text-xs text-white rounded-none w-full sm:w-auto">
                   Try in Sandbox
                 </button>
              </div>
           </div>

        </div>
      </section>

      {/* Featured Products */}
      <AIRecommendation />

      {/* Scratch Card */}
      <section className="py-14 px-4 bg-gradient-to-br from-maroon-500/10 to-gold-500/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title mb-2">Exclusive Offer</h2>
          <div className="gold-divider" />
          <p className="text-center text-gray-500 mb-6 text-sm">Every customer gets a special coupon. Scratch yours now!</p>
          <ScratchCard onCoupon={(c) => toast.success(`🎉 Coupon ${c.code} unlocked! ${c.type === 'percent' ? c.discount + '% off' : '₹' + c.discount + ' off'}`)} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="gold-divider" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card p-5 border border-white/5 hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold-500" />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gold-400 font-bold tracking-widest uppercase">{t.city}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <FiStar key={i} size={13} className={i < Math.floor(t.rating) ? 'text-gold-500 fill-current' : 'text-gray-600'} fill={i < Math.floor(t.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic block tracking-wide">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 overflow-hidden text-center border-y border-brand-500/30">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Create Your Memory Jewellery</h2>
          <p className="text-brand-100 mb-10 max-w-lg mx-auto text-lg font-light tracking-wide">Upload a photo, add an engraving — craft a bespoke piece that tells your unique story.</p>
          <Link to="/memory-jewelry" className="btn-gold shadow-2xl shadow-brand-500/40">
            Design Masterpiece →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
