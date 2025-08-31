export const useVoiceCommands = (items, addItemAPI, deleteItemAPI, setError, priceList) => {
  const processCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();

    // Units for parsing quantities
    const units = ['kg', 'g', 'grams', 'l', 'liters', 'ml', 'dozen', 'bottle', 'bottles', 'pack', 'packs', 'loaf', 'loaves'];

    // --- ADD ITEM LOGIC ---
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
        const productInfo = priceList.find(p => p.name.toLowerCase() === itemName.toLowerCase());
        const price = productInfo ? productInfo.price : 0;
        const numericQuantity = parseFloat(quantity) || 1;
        const totalPrice = price * numericQuantity;

        console.log(`Adding item: ${itemName}, Price: ${price}, Total: ${totalPrice}`);
        addItemAPI({ name: itemName, quantity, price, totalPrice });
      } else {
        setError(`Could not figure out what to add from: "${command}"`);
      }
      return;
    }

    // --- REMOVE ITEM LOGIC ---
    if (lowerCommand.startsWith('remove ') || lowerCommand.startsWith('delete ')) {
      let itemName = lowerCommand.replace(/^(remove|delete)\s+/, '').trim();
      if (!itemName) {
        setError(`Could not figure out what to remove from: "${command}"`);
        return;
      }

      // Find the item in current list
      const itemToRemove = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
      if (itemToRemove) {
        console.log(`Removing item: ${itemName}`);
        deleteItemAPI(itemToRemove._id);
      } else {
        setError(`Item "${itemName}" not found in your shopping list.`);
      }
      return;
    }

    // --- UNKNOWN COMMAND ---
    setError(`Command not understood: "${command}"`);
  };

  return { processCommand };
};
