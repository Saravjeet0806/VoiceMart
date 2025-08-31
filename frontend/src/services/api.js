import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Fetches the current shopping list items
export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shopping list.');
  }
};

// Fetches both history and seasonal suggestions
export const getSuggestions = async () => {
  try {
    const [historyRes, seasonalRes] = await Promise.all([
      axios.get(`${API_URL}/suggestions/history`),
      axios.get(`${API_URL}/suggestions/seasonal`)
    ]);

    return [
      ...historyRes.data.map((s) => ({ ...s, type: 'History' })),
      ...seasonalRes.data.map((s) => ({ ...s, type: 'Seasonal' })),
    ];
  } catch (error) {
    throw new Error('Failed to fetch suggestions.');
  }
};

// Adds a new item to the list
export const addItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_URL}/items`, itemData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add item.');
  }
};

// Fetches the product price list
export const getPrices = async () => {
  try {
    const response = await axios.get(`${API_URL}/prices`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch prices.');
  }
};

// Deletes an item from the list
export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/items/${id}`);
    return id; // Return the id on success for filtering
  } catch (error) {
    throw new Error('Failed to delete item.');
  }
};
