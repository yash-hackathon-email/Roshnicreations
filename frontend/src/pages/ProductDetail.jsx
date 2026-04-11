import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProductById, fetchProducts } from '../services/productService'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import ARTryOn from '../components/ARTryOn'
import Jewelry3DViewer from '../components/Jewelry3DViewer'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { FiShoppingCart, FiArrowLeft, FiStar, FiShare2, FiHeart } from 'react-icons/fi'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsStarHalf } from 'react-icons/bs'
import { starRating } from '../utils/helpers'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product,    setProduct]    = useState(null)
  const [related,    setRelated]    = useState([])
  const [loading,    setLoading]    = useState(true)
  const [activeImg,  setActiveImg]  = useState(0)
  const [qty,        setQty]        = useState(1)
  const [wishlist,   setWishlist]   = useState(false)
  const [activeTab,  setActiveTab]  = useState('description')

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    Promise.all([fetchProductById(id), fetchProducts()]).then(([prod, all]) => {
      setProduct(prod)
      setRelated(all.filter(p => p.id !== id && p.category === prod?.category).slice(0, 4))
      setLoading(false)
      setActiveImg(0)
    })
  }, [id])

  if (loading) return <LoadingSpinner size="lg" message="Loading product…" />
  if (!product) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">🔍</p>
      <p className="text-gray-500 text-lg">Product not found</p>
      <Link to="/products" className="btn-gold mt-4 inline-block">Browse Products</Link>
    </div>
  )

  const { full, half, empty } = starRating(product.rating)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gold-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gold-600">Products</Link>
        <span>/</span>
        <span className="text-gray-800 capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images and 3D Viewer */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            {activeImg === '3d' ? (
               <Jewelry3DViewer modelUrl={product.model || 'placeholder.glb'} />
            ) : (
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            )}
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
               onClick={() => setActiveImg('3d')}
               className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 flex flex-col items-center justify-center bg-gray-900 transition-all ${
                 activeImg === '3d' ? 'border-amber-500 shadow-md shadow-amber-500/20' : 'border-gray-800 hover:border-gray-600'
               }`}
            >
               <span className="text-2xl font-bold text-amber-500 mb-1">3D</span>
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">Interact</span>
            </button>
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImg === i ? 'border-amber-500 shadow-md shadow-amber-500/20' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* AR Try-On Context */}
          <div className="mt-4">
            <Link to={`/try-on?img=${product.images[0]}&cat=${product.category}`} className="w-full btn-outline-gold py-4 flex items-center justify-center gap-2 font-bold text-lg rounded-xl">
               Virtual Try-On
            </Link>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <span className="badge-gold capitalize">{product.category}</span>
            {product.isFeatured && <span className="badge badge-maroon ml-2">⭐ Featured</span>}
            <h1 className="font-serif text-3xl font-bold text-gray-800 mt-2 leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array(full).fill(0).map((_,i)  => <AiFillStar    key={`f${i}`} className="text-gold-500" size={18} />)}
              {half === 1 &&                        <BsStarHalf                 className="text-gold-500" size={18} />}
              {Array(empty).fill(0).map((_,i) => <AiOutlineStar key={`e${i}`} className="text-gray-300" size={18} />)}
            </div>
            <span className="text-gray-600 text-sm font-medium">{product.rating} / 5.0</span>
            <span className="text-gray-400 text-sm">• {Math.floor(Math.random() * 200) + 50} reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-maroon-500">{formatPrice(product.price)}</span>
            <span className="text-gray-400 text-sm line-through">{formatPrice(Math.round(product.price * 1.2))}</span>
            <span className="badge bg-green-100 text-green-700">17% OFF</span>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 bg-gray-50 hover:bg-gray-100 font-bold text-lg transition-colors">−</button>
                <span className="px-5 py-2 font-medium text-gray-800 min-w-[50px] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 bg-gray-50 hover:bg-gray-100 font-bold text-lg transition-colors">+</button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => { for(let i=0; i<qty; i++) addItem(product) }}
              disabled={product.stock === 0}
              className="flex-1 btn-gold flex items-center justify-center gap-2 py-3 text-base disabled:opacity-50"
            >
              <FiShoppingCart size={18} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => setWishlist(v => !v)}
              className={`p-3 rounded-lg border-2 transition-colors ${wishlist ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-500 hover:border-red-300'}`}
            >
              <FiHeart size={20} fill={wishlist ? 'currentColor' : 'none'} />
            </button>
            <button className="p-3 rounded-lg border-2 border-gray-300 text-gray-500 hover:border-gold-300 transition-colors"
              onClick={() => navigator.clipboard.writeText(window.location.href)}>
              <FiShare2 size={20} />
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { icon: '🚚', text: 'Free Delivery above ₹999' },
              { icon: '↩️',  text: '7-day easy returns'       },
              { icon: '🔒', text: 'Secure payment'           },
              { icon: '✨', text: 'Authenticity guaranteed'  },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2.5 text-xs text-gray-600">
                <span>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 flex gap-4 pt-2">
            {['description', 'details', 'care'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-600 leading-relaxed pt-1">
            {activeTab === 'description' && <p>{product.description}</p>}
            {activeTab === 'details' && (
              <ul className="space-y-1">
                <li>• <strong>Category:</strong> {product.category}</li>
                <li>• <strong>Material:</strong> Gold Plated / Kundan</li>
                <li>• <strong>Occasion:</strong> Wedding, Festival, Daily Wear</li>
                <li>• <strong>Weight:</strong> ~35g</li>
                <li>• <strong>Dimensions:</strong> One size fits most</li>
              </ul>
            )}
            {activeTab === 'care' && (
              <ul className="space-y-1">
                <li>• Store in the provided velvet pouch</li>
                <li>• Avoid contact with water and perfumes</li>
                <li>• Clean with soft dry cloth</li>
                <li>• Keep away from direct sunlight</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
