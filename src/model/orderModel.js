import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address : {
    type : String,
    required : true
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


