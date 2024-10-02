import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
     bookPrice: {
        type: Number,
        reqired: true
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },


});
export const Product = mongoose.model('Product', productSchema);