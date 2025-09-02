import React, { useState, useMemo } from 'react';

const Menu = ({ priceList, onAdd, onError }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});

  // Get unique categories from price list
  const categories = useMemo(() => {
    const categorySet = new Set(['all']);
    priceList.forEach(item => {
      // Try to categorize based on item name or you can add category field to your JSON
      if (['apple', 'apples', 'banana', 'bananas', 'mango', 'mangoes', 'orange', 'oranges', 'watermelon'].includes(item.name)) {
        categorySet.add('fruits');
      } else if (['potato', 'potatoes', 'onion', 'onions', 'tomato', 'tomatoes', 'lettuce', 'carrot', 'carrots'].includes(item.name)) {
        categorySet.add('vegetables');
      } else if (['milk', 'cheese', 'yogurt'].includes(item.name)) {
        categorySet.add('dairy');
      } else if (['bread', 'cereal'].includes(item.name)) {
        categorySet.add('bakery');
      }
    });
    return Array.from(categorySet);
  }, [priceList]);

  // Get price range for slider
  const { minPrice, maxPrice } = useMemo(() => {
    if (priceList.length === 0) return { minPrice: 0, maxPrice: 1000 };
    const prices = priceList.map(item => item.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, [priceList]);

  // Filter items based on category, price range, and search
  const filteredItems = useMemo(() => {
    return priceList.filter(item => {
      // Category filter
      const categoryMatch = selectedCategory === 'all' ||
        (selectedCategory === 'fruits' && ['apple', 'apples', 'banana', 'bananas', 'mango', 'mangoes', 'orange', 'oranges', 'watermelon'].includes(item.name)) ||
        (selectedCategory === 'vegetables' && ['potato', 'potatoes', 'onion', 'onions', 'tomato', 'tomatoes', 'lettuce', 'carrot', 'carrots'].includes(item.name)) ||
        (selectedCategory === 'dairy' && ['milk', 'cheese', 'yogurt'].includes(item.name)) ||
        (selectedCategory === 'bakery' && ['bread', 'cereal'].includes(item.name));

      // Price range filter
      const priceMatch = item.price >= priceRange.min && item.price <= priceRange.max;

      // Search filter
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [priceList, selectedCategory, priceRange, searchTerm]);

  const handleQuantityChange = (itemName, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [itemName]: quantity
    }));
  };

  const handleAddToCart = async (item) => {
    try {
      const quantity = quantities[item.name] || 1;
      const itemData = {
        name: item.name,
        quantity: `${quantity} ${item.unit}${quantity > 1 ? 's' : ''}`,
        unit: item.unit,
        price: item.price,
        totalPrice: item.price * quantity,
        unitPrice: item.price,
        numericQuantity: quantity
      };
      await onAdd(itemData);

      // Reset quantity after adding
      setQuantities(prev => ({
        ...prev,
        [item.name]: 1
      }));
    } catch (error) {
      onError('Failed to add item to cart');
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: minPrice, max: maxPrice });
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-black hover:text-blue-400 ">
          Reset Filters
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ₹{priceRange.min} - ₹{priceRange.max}
        </label>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600">Min Price</label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max Price</label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>

      {/* Items Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredItems.length} of {priceList.length} items
        </p>
      </div>

      {/* Items List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No items match your current filters
          </p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 capitalize">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} per {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    step="1"
                    value={quantities[item.name] ?? "1"}  // ✅ allow empty value
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        // ✅ allow clearing the field
                        handleQuantityChange(item.name, "");
                      } else {
                        handleQuantityChange(item.name, parseInt(val));
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "" || parseInt(e.target.value) < 1) {
                        // ✅ reset to 1 if user leaves empty or < 1
                        handleQuantityChange(item.name, 1);
                      }
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    title={`Quantity in ${item.unit}s`}
                  />
                  <span className="text-xs text-gray-500">{item.unit}{(quantities[item.name] || 1) > 1 ? 's' : ''}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              {quantities[item.name] && quantities[item.name] > 1 && (
                <p className="text-xs text-gray-500">
                  Total: ₹{item.price * quantities[item.name]} for {quantities[item.name]} {item.unit}{quantities[item.name] > 1 ? 's' : ''}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Add Buttons for Popular Items */}
      <div className="mt-6 pt-4 border-t border-gray-200 sm:mb-30 mb-10">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Add Popular Items</h3>
        <div className="flex flex-wrap gap-2">
          {['milk', 'bread', 'apple', 'potato', 'onion'].map(itemName => {
            const item = priceList.find(p => p.name === itemName);
            return item ? (
              <button
                key={itemName}
                onClick={() => handleAddToCart(item)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors"
              >
                + {item.name} (₹{item.price})
              </button>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;