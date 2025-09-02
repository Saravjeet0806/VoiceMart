import React from 'react';

const ShoppingList = ({ items, onDelete }) => {
  // Calculate the grand total
  const grandTotal = items.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-2xl font-bold">Your Shopping Bill</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">Your list is empty. Add items to see your bill.</p>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item._id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                {/* Item Name and Quantity */}
                <div className="flex-grow">
                  <span className="font-medium capitalize">{item.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({item.quantity})</span>
                </div>

                {/* Price Details */}
                <div className="text-right w-32">
                  <span className="font-semibold">₹{item.totalPrice.toFixed(2)}</span>
                  {item.price > 0 && (
                     <p className="text-xs text-gray-400">@ ₹{item.price}</p>
                  )}
                </div>

                {/* Delete Button */}
                <button onClick={() => onDelete(item._id)} className="ml-4 text-red-500 hover:text-red-700 font-bold text-lg">
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t-2 border-dashed mb-20">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Grand Total</span>
              <span className="text-2xl font-bold text-blue-600">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingList;