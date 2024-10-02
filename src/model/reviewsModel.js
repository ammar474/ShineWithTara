import mongoose from "mongoose";
const reviewsSchema = mongoose.Schema({
  name:{
    type:String,
    required : true
  },
   comment:{
    type:String,
    required : true
  },
  rating:{
    type:Number,
    required : true
  }
});

export const Reviews = mongoose.model("Reviews" , reviewsSchema );