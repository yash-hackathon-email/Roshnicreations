import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { CATEGORIES } from '../utils/constants'
import { FiSearch, FiFilter, FiX, FiSliders } from 'react-icons/fi'

const SORT_OPTIONS = [
  { value: 'default',     label: 'Default'         },
  { value: 'price_asc',   label: 'Price: Low→High' },
  { value: 'price_desc',  label: 'Price: High→Low' },
  { value: 'rating_desc', label: 'Top Rated'       },
  { value: 'newest',      label: 'Newest'          },
]

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [sort,     setSort]     = useState('default')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [mobileFilter, setMobileFilter] = useState(false)

  useEffect(() => {
    fetchProducts().then(data => { setProducts(data); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (search)             list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sort) {
      case 'price_asc':   list.sort((a, b) => a.price - b.price);   break
      case 'price_desc':  list.sort((a, b) => b.price - a.price);   break
      case 'rating_desc': list.sort((a, b) => b.rating - a.rating); break
      case 'newest':      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
    }
    return list
  }, [products, category, search, sort, priceRange])

  const Sidebar = () => (
    <div className="space-y-8">
      <div>
        <p className="font-serif tracking-widest text-xs uppercase text-gray-400 font-bold mb-4">Category</p>
        <div className="space-y-1">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => { setCategory(c.id); setSearchParams(c.id !== 'all' ? { category: c.id } : {}) }}
              className={`w-full text-left px-4 py-3 rounded-none text-sm transition-all border-l-2 ${
                category === c.id
                  ? 'bg-brand-50 text-brand-900 border-brand-500 font-semibold'
                  : 'text-gray-600 border-transparent hover:bg-gray-50'
              }`}
            >
              {c.label}
              <span className="float-right text-gray-400 text-xs">
                {c.id === 'all' ? products.length : products.filter(p => p.category === c.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700 mb-3">Price Range</p>
        <div className="space-y-2">
          <input
            type="range" min={0} max={3000} step={50}
            value={priceRange[1]}
            onChange={e => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-gold-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span className="font-semibold text-gold-600">Up to ₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-700 mb-3">Sort By</p>
        <div className="space-y-1">
          {SORT_OPTIONS.map(o => (
            <button
              key={o.value}
              onClick={() => setSort(o.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                sort === o.value ? 'bg-gold-100 text-gold-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setCategory('all'); setPriceRange([0, 3000]); setSort('default'); setSearch('') }}
        className="w-full text-sm text-red-500 hover:text-red-700 flex items-center gap-1 py-1"
      >
        <FiX size={13} /> Clear All Filters
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Our Collection</h1>
        <p className="text-gray-500 mt-1">{filtered.length} {filtered.length === 1 ? 'product' : 'products'} found</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search jewellery…"
          className="input-field pl-9"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button onClick={() => setMobileFilter(true)} className="flex items-center gap-2 btn-outline-gold text-sm px-4 py-2">
          <FiSliders size={14} /> Filters & Sort
        </button>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilter(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-800">Filters</p>
              <button onClick={() => setMobileFilter(false)}><FiX size={20} /></button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <FiFilter size={15} className="text-gold-500" />
              <span className="font-semibold text-gray-700">Filters</span>
            </div>
            <Sidebar />
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {loading ? (
            <LoadingSpinner message="Loading products…" />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">😞</p>
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button onClick={() => { setCategory('all'); setSearch(''); setPriceRange([0, 3000]) }} className="mt-4 btn-gold">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
