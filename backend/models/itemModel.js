const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an item name'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    category: {
      type: String,
      default: 'Uncategorized',
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Item', itemSchema);