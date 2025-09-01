import React, { useState, useEffect, useCallback } from 'react';

import ShoppingList from './components/ShoppingList';
import Suggestions from './components/Suggestions';
import VoiceControl from './components/VoiceControl';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import './App.css';

// Import our clean functions
import * as api from './services/api';
import { useVoiceCommands } from './hooks/useVoiceCommands';

const App = () => {
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [priceList, setPriceList] = useState([]);
  const [activeTab, setActiveTab] = useState('list');

  // --- Data Fetching ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedItems, fetchedSuggestions, fetchedPrices] = await Promise.all([
          api.getItems(),
          api.getSuggestions(),
          api.getPrices(),
        ]);
        setItems(fetchedItems);
        setSuggestions(fetchedSuggestions);
        setPriceList(fetchedPrices);
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, []);

  // --- API Handlers ---
  const handleAddItem = useCallback(async (itemData) => {
    try {
      const newItem = await api.addItem(itemData);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleDeleteItem = useCallback(async (id) => {
    try {
      await api.deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // --- Voice command logic ---
  const { processCommand } = useVoiceCommands(
    items,
    handleAddItem,
    handleDeleteItem,
    setError,
    priceList
  );

  // --- Render Tab Content ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'list':
        return (
          <div className="max-w-4xl mx-auto">
            <ShoppingList items={items} onDelete={handleDeleteItem} />
          </div>
        );
      case 'menu':
        return (
          <div className="max-w-4xl mx-auto">
            <Menu 
              priceList={priceList} 
              onAdd={handleAddItem}
              onError={setError}
            />
          </div>
        );
      case 'suggestions':
        return (
          <div className="max-w-4xl mx-auto">
            <Suggestions suggestions={suggestions} onAdd={handleAddItem} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        itemCount={items.length}
      />

      <main className="container mx-auto p-4 md:p-8 pb-24">
        {renderTabContent()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="container mx-auto p-4">
          <VoiceControl processCommand={processCommand} />
          {error && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-center">
              {error}
              <button 
                onClick={() => setError('')}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default App;