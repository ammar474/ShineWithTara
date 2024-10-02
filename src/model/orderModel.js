import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
   orderStatus: {
    type: String,
    default: 'pending'
  },
  created_At: {
    type: Date,
    default: Date.now
  }
});

export const Order = mongoose.model('Order', orderSchema);


