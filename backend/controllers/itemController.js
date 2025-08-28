import Item from '../models/itemModel.js';

// A simple function to auto-categorize items based on keywords
const categorizeItem = (itemName) => {
  const name = itemName.toLowerCase();
  if (name.includes('milk') || name.includes('cheese') || name.includes('yogurt')) return 'Dairy';
  if (name.includes('apple') || name.includes('banana') || name.includes('lettuce')) return 'Produce';
  if (name.includes('bread') || name.includes('cereal')) return 'Bakery & Grains';
  if (name.includes('chicken') || name.includes('beef')) return 'Meat';
  if (name.includes('chips') || name.includes('cookies') || name.includes('soda')) return 'Snacks';
  return 'Miscellaneous';
};

// @desc    Get all shopping list items
// @route   GET /api/items
const getItems = async (req, res) => {
  try {
    // For this MVP, we only get items that are not yet purchased
    const items = await Item.find({ isPurchased: false }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new item to the shopping list
// @route   POST /api/items
const addItem = async (req, res) => {
  const { name, quantity } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Please provide an item name' });
  }

  try {
    const newItem = await Item.create({
      name,
      quantity: quantity || 1,
      category: categorizeItem(name),
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove an item from the list
// @route   DELETE /api/items/:id
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.deleteOne(); // `remove()` is deprecated in Mongoose 7
    res.status(200).json({ id: req.params.id, message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Search for items
// @route   GET /api/items/search
const searchItems = async (req, res) => {
  try {
    const query = { name: { $regex: req.query.q, $options: 'i' } }; // Case-insensitive search
    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getItems, addItem, deleteItem, searchItems };
