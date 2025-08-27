const Item = require('../models/itemModel');


const seasonalItems = [
    { name: 'Mangoes', quantity: 1, category: 'Produce' },
    { name: 'Watermelon', quantity: 1, category: 'Produce' },
    { name: 'Corn on the cob', quantity: 4, category: 'Produce' },
];


const substituteMap = {
    'milk': { name: 'Almond Milk', quantity: 1, category: 'Dairy Alternatives' },
    'soda': { name: 'Sparkling Water', quantity: 1, category: 'Beverages' },
    'white bread': { name: 'Whole Wheat Bread', quantity: 1, category: 'Bakery & Grains' },
};


const getHistorySuggestions = async (req, res) => {
  try {
    
    const suggestions = await Item.aggregate([
      { $group: { _id: '$name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      { $project: { name: '$_id', _id: 0, suggestionType: 'Based on your history' } },
    ]);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const getSeasonalSuggestions = async (req, res) => {
  // Returns a static list of seasonal items.
  res.status(200).json(seasonalItems);
};

const getSubstituteSuggestion = async (req, res) => {
    const itemName = req.params.itemName.toLowerCase();
    const substitute = substituteMap[itemName];

    if (substitute) {
        res.status(200).json(substitute);
    } else {
        res.status(404).json({ message: 'No substitute suggestion found.' });
    }
};


module.exports = {
  getHistorySuggestions,
  getSeasonalSuggestions,
  getSubstituteSuggestion,
};