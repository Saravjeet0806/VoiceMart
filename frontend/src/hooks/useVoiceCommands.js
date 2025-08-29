export const useVoiceCommands = (items, addItemAPI, deleteItemAPI, setError) => {
  const processCommand = (command) => {
    console.log(`Processing command: "${command}"`);
    const lowerCommand = command.toLowerCase().trim();

    const units = [
      'kg', 'g', 'grams', 'l', 'liters', 'ml', 'dozen',
      'bottle', 'bottles', 'pack', 'packs', 'loaf', 'loaves',
    ];

    // --- Add Logic ---
    if (lowerCommand.startsWith('add ')) {
      let content = lowerCommand.substring(4).trim();
      let parts = content.split(' ');
      let quantity = '1';
      let itemName = '';

      const potentialQuantity = parseFloat(parts[0]);
      if (!isNaN(potentialQuantity)) {
        if (parts.length > 1 && units.includes(parts[1])) {
          quantity = `${parts[0]} ${parts[1]}`;
          itemName = parts.slice(2).join(' ');
        } else {
          quantity = parts[0];
          itemName = parts.slice(1).join(' ');
        }
      } else {
        itemName = content;
      }

      if (itemName) {
        console.log(`Adding item: ${itemName}, Quantity: ${quantity}`);
        addItemAPI(itemName, quantity);
      } else {
        setError(`Could not figure out what to add from: "${command}"`);
      }
      return;
    }

    // --- Remove Logic ---
    const removeRegex = /(?:remove|delete) (.+)/i;
    const removeMatch = lowerCommand.match(removeRegex);

    if (removeMatch) {
      const itemName = removeMatch[1].trim();
      const itemToRemove = items.find(
        (item) => item.name.toLowerCase() === itemName
      );
      if (itemToRemove) {
        console.log(`Removing item: ${itemName}`);
        deleteItemAPI(itemToRemove._id);
      } else {
        setError(`Could not find "${itemName}" in your list.`);
      }
      return;
    }

    setError(`Command not understood: "${command}"`);
  };

  return { processCommand };
};