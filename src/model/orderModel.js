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
      product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Product"
      },
       productName: String,
      price: Number,
      quantity: Number,
      image : String
      
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
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: true
});

export const Order = mongoose.model('Order', orderSchema);


