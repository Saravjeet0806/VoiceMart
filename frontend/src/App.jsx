import React, { useState, useEffect, useCallback } from 'react';
import ShoppingList from './components/ShoppingList';
import Suggestions from './components/Suggestions';
import VoiceControl from './components/VoiceControl';
import './App.css';

import * as api from './services/api';
import { useVoiceCommands } from './hooks/useVoiceCommands';

const App = () => {
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedItems, fetchedSuggestions] = await Promise.all([
          api.getItems(),
          api.getSuggestions(),
        ]);
        setItems(fetchedItems);
        setSuggestions(fetchedSuggestions);
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, []);

  const handleAddItem = useCallback(async (name, quantity) => {
    try {
      const newItem = await api.addItem(name, quantity);
      setItems((prev) => [newItem, ...prev]);
      // Optionally refresh suggestions after adding
      setSuggestions(await api.getSuggestions());
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

  const { processCommand } = useVoiceCommands(items, handleAddItem, handleDeleteItem, setError);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">🛒 Voice Shopping Assistant</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ShoppingList items={items} onDelete={handleDeleteItem} />
        </div>
        <div>
          <Suggestions suggestions={suggestions} onAdd={handleAddItem} />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="container mx-auto p-4">
          <VoiceControl processCommand={processCommand} />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </footer>
    </div>
  );
};

export default App;