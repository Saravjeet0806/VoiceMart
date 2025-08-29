import React from 'react';

const Suggestions = ({ suggestions, onAdd }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">✨ Smart Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-gray-500">No suggestions right now. Add items to get started!</p>
      ) : (
        <ul>
          {suggestions.map((s, index) => (
            <li key={index} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
              <div>
                <span className="font-medium">{s.name}</span>
                <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${s.type === 'History' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'}`}>
                  {s.type}
                </span>
              </div>
              <button onClick={() => onAdd(s.name, s.quantity || 1)} className="text-blue-500 hover:text-blue-700 text-2xl font-light">
                +
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Suggestions;