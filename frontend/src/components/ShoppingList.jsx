import React from 'react';

const ShoppingList = ({ items, onDelete }) => {
  const categorizedItems = items.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Shopping List</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your list is empty. Add items using your voice!</p>
      ) : (
        Object.keys(categorizedItems).sort().map(category => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{category}</h3>
            <ul>
              {categorizedItems[category].map(item => (
                <li key={item._id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                  <span>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.quantity})</span>
                  </span>
                  <button onClick={() => onDelete(item._id)} className="text-red-500 hover:text-red-700 font-bold">
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ShoppingList;