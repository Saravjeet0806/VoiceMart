import mongoose from 'mongoose';

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

const Item = mongoose.model('Item', itemSchema);

export default Item;
