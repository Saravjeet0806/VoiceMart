import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an item name'],
      trim: true,
    },
    quantity: {
      type: String, // changed from Number → String
      required: true,
      default: '1', // default value is now a string
    },
     price: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
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
