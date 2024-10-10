import { Product } from "../model/productModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AddProducts = async (req, res) => {
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
}

export const GetProduct = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  const searchQuery = req.query.category;


  try {
    const query = searchQuery ? { category: searchQuery } : {};

    const getProductData = await Product.find(query).skip(skip).limit(limit);
    if (getProductData) { return res.status(200).send({ getProductData }) }
    else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
}

export const ProductUpdateById = async (req, res) => {
  const { bookName, bookPrice, category } = req.body
  const { id } = req.params
  const imageFile = req.file
  console.log("filename" ,  imageFile.filename);
  
  if (!bookName, !bookPrice, !category, !imageFile) {
    return res.status(401).send({ message: " send all required fieldd " });
  }
 try {
  const  product = await Product.findById(id);
  if (!product) {
      return res.status(404).json({ message: 'Product not found' });
  }
  if (req.file) {
    const oldImagePath = path.join(__dirname, `../../${product.imageUrl}`);
    console.log('Old Image Path:', oldImagePath);
   if (fs.existsSync(oldImagePath)) {
        try {
            fs.unlinkSync(oldImagePath);
            console.log('Old image deleted successfully');
        } catch (err) {
            console.error('Error deleting old image:', err);
        }
    } else {
        console.log('Old image does not exist');
    }
}
const upadteProduct = {
      bookName,
      bookPrice,
      category,
      imageUrl: imageFile.path
    }
    const upadtedProduct = await Product.findByIdAndUpdate(id, { $set: upadteProduct }, { new: true, useFindAndModify: false });
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
}

export const ProductDelete = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Product.findByIdAndDelete(id);
    if (result) { return res.status(201).send({ message: 'Product deleted' }) }
    else {
      res.status(401).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}