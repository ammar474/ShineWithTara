import express from "express";
import { Product } from "../model/productModel.js";
import { Upload } from "../middleware/multerMiddleware.js";
import  authentication from "../middleware/authentication.js"

const productRoutes = express.Router();

productRoutes.post("/AddProducts",  Upload.single("image"), async (req, res) => {

  const { bookName, bookPrice, category } = req.body;
  const imageFile = req.file;
  if (!imageFile || !bookName || !bookPrice || !category) {
    return res.status(400).send('No file uploaded.');
  }
  try {

    const newProduct = new Product({
      bookName,
      bookPrice,
      category,
      imageUrl: imageFile.path
    });
    const productAdded = await newProduct.save();
    if (productAdded) { return res.status(200).json({ message: "product add succesfully", product: productAdded }) }
    return res.status(400).send({ message: "product not add" });
  }
  catch (error) {
    console.log(error)
    return res.status(500).send({ message: error.message });

  }
});

productRoutes.get("/GetProduct", authentication , async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.category;
    

  try {
    const query = searchQuery ? {category : searchQuery } : {};
    
    const getProductData = await Product.find(query).skip(skip).limit(limit);
    if (getProductData) { return res.status(200).send({ getProductData }) }
    else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
}); 

productRoutes.put("/ProductUpdate/:id", Upload.single("image"), async (req, res) => {
  const { bookName, bookPrice, category } = req.body
  const imageFile = req.file
  if (!bookName, !bookPrice, !category, !imageFile) {   
    return res.status(401).send({ message: " send all required fieldd " });
  }
  try {
    const { id } = req.params
    const upadteProduct = {
      bookName,
      bookPrice,
      category,
      imageUrl: imageFile.path
    }
    const upadtedProduct = await Product.findByIdAndUpdate(id , {$set : upadteProduct },{ new: true, useFindAndModify: false });
    if (upadtedProduct) {
      return res.status(200).send({ message: "product updated successfully", upadtedProduct });
    }
    else {
      return res.status(401).send({ message: "product not update" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

productRoutes.delete("/ProductDelete/:id", async (req, res) => {

  try {
    const { id } = req.params
    const result = await Product.findByIdAndDelete(id);
    if (result) { return res.status(201).send({ message: 'Product deleted' })}
    else {
      res.status(401).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default productRoutes;
