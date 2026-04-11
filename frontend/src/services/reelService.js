import { fetchProducts } from './productService';

export const fetchReels = async () => {
  // In a real app, this would fetch from Firestore 'reels' collection
  // Mock data for now connecting to real products
  const products = await fetchProducts();
  
  return [
    {
      id: 'reel_001',
      videoUrl: 'https://cdn.pixabay.com/vimeo/453186178/jewellery-49451.mp4?width=1280&hash=8563a61f365d95d1fa291a1a9e8b15d9b5e5fb59',
      productId: products[0]?.id || 'prod_001',
      productName: products[0]?.name || 'Premium Kundan Choker',
      productPrice: products[0]?.price || 1800,
      description: 'The shimmer of authentic craftsmanship. ✨ #RoshniCreations',
      likes: '12.4K',
      comments: '453'
    },
    {
      id: 'reel_002',
      videoUrl: 'https://cdn.pixabay.com/vimeo/349453932/watch-25121.mp4?width=1280&hash=5e8f447781f8f7803e6fd2372e2764b8a36d2466',
      productId: products[4]?.id || 'prod_005',
      productName: products[4]?.name || 'Premium Bridal Watch',
      productPrice: products[4]?.price || 1070,
      description: 'Timeless elegance on your wrist. #BridalStyle',
      likes: '8.2K',
      comments: '120'
    }
  ];
};
