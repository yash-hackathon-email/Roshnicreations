import { fetchProducts } from './productService';

export const getStylistRecommendations = async (preferences) => {
  const { gender, age, region, occasion, budget } = preferences;
  const products = await fetchProducts();

  // Rule-based filtering
  return products.filter(product => {
    // Budget filter (assuming product.price is numeric)
    const isWithinBudget = product.price <= budget;
    
    // Occasion logic (Mapping common keywords)
    let matchesOccasion = true;
    if (occasion === 'Wedding') {
      matchesOccasion = ['necklace', 'choker', 'mangalsutra'].includes(product.category);
    } else if (occasion === 'Daily Wear') {
      matchesOccasion = product.price < 1000;
    } else if (occasion === 'Festival') {
      matchesOccasion = product.isFeatured || product.price > 500;
    }

    return isWithinBudget && matchesOccasion;
  }).slice(0, 3); // Return top 3 recommendations
};
