const API_URL = 'http://localhost:5001/api';

// Fetches the current shopping list items
export const getItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  if (!response.ok) throw new Error('Failed to fetch shopping list.');
  return await response.json();
};

// Fetches both history and seasonal suggestions
export const getSuggestions = async () => {
  const [historyRes, seasonalRes] = await Promise.all([
    fetch(`${API_URL}/suggestions/history`),
    fetch(`${API_URL}/suggestions/seasonal`),
  ]);

  if (!historyRes.ok || !seasonalRes.ok) {
    throw new Error('Failed to fetch suggestions.');
  }

  const historyData = await historyRes.json();
  const seasonalData = await seasonalRes.json();

  return [
    ...historyData.map((s) => ({ ...s, type: 'History' })),
    ...seasonalData.map((s) => ({ ...s, type: 'Seasonal' })),
  ];
};

// Adds a new item to the list
export const addItem = async (name, quantity) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity }),
  });
  if (!response.ok) throw new Error('Failed to add item.');
  return await response.json();
};

// Deletes an item from the list
export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete item.');
  return id; // Return the id on success for filtering
};