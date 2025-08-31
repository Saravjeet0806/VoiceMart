import prices from '../data/productPrices.json' with { type: 'json' };


export const getPrices = (req, res) => {
  try {
    // Combine all categories into a single flat array for easier searching on the frontend
    const allPrices = [
      ...prices.fruits,
      ...prices.vegetables,
      ...prices.dairy,
      ...prices.bakery
    ];
    res.status(200).json(allPrices);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not load prices.' });
  }
};
