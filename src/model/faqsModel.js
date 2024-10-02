import mongoose from "mongoose";
const faqsSchema = mongoose.Schema({
  question:{
    type:String,
    required : true
  },
   answer:{
    type:String,
    required : true
  },

});

export const Faqs = mongoose.model("Faqs" , faqsSchema );