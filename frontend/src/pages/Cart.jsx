import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi'

const Cart = () => {
  const { items, removeItem, updateQty, cartTotal, clearCart } = useCart()

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <FiShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
      <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-6">Discover our beautiful jewellery collection and add your favourites.</p>
      <Link to="/products" className="btn-gold">Browse Collection</Link>
    </div>
  )

  const shipping = cartTotal >= 999 ? 0 : 99
  const grandTotal = cartTotal + shipping

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <button onClick={clearCart} className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1 transition-colors">
          <FiTrash2 size={14} /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="card p-4 flex gap-4">
              <Link to={`/products/${item.id}`} className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 hover:text-gold-600 transition-colors line-clamp-2 leading-snug">{item.name}</h3>
                </Link>
                {item.isCustom && (
                  <p className="text-xs text-gold-600 mt-0.5">✨ Custom piece</p>
                )}
                <p className="text-maroon-500 font-bold mt-1">{formatPrice(item.price)}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <FiMinus size={12} />
                    </button>
                    <span className="px-4 py-1.5 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <FiPlus size={12} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700">{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-24">
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400 bg-gold-50 px-3 py-1.5 rounded-lg">
                  Add {formatPrice(999 - cartTotal)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-800 text-base">
                <span>Grand Total</span>
                <span className="text-maroon-500 text-lg">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn-gold w-full mt-5 flex items-center justify-center gap-2 py-3 text-base">
              Proceed to Checkout <FiArrowRight />
            </Link>
            <Link to="/products" className="block text-center text-sm text-gray-500 hover:text-gold-600 mt-3 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
