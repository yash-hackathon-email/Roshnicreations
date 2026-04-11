const PRODUCTS_URL = 'https://raw.githubusercontent.com/SatyawanPanchal/roshni_creations_assets_ssh01/refs/heads/main/products.json';

export const fetchProducts = async () => {
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    
    // Map available GLB files to jewelry naturally
    const mappedProducts = data.products.map(p => {
       const models = [
         '/ring_silver_with_black_cristal.glb',
         '/ring_gold_with_diamond.glb',
         '/diamond_ring_3d_print_ready.glb'
       ];
       const name = p.name.toLowerCase();
       let modelNum = p.id.charCodeAt(p.id.length - 1) % models.length; // deterministic random injection
       
       let model = models[modelNum];
       
       // Force specificity if the name exactly implies
       if (name.includes('silver') && name.includes('ring')) model = '/ring_silver_with_black_cristal.glb';
       else if (name.includes('gold') && name.includes('ring')) model = '/ring_gold_with_diamond.glb';
       
       return { ...p, model };
    });
    
    return mappedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(p => p.id === id);
};
