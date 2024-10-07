import express from "express";
import { AddProducts , GetProduct ,ProductUpdateById , ProductDelete } from "../controllers/productController.js";
import { Upload } from "../middleware/multerMiddleware.js";
import  authentication from "../middleware/authentication.js"

const productRoutes = express.Router();

productRoutes.post("/AddProducts",  Upload.single("image") , AddProducts);

productRoutes.get("/GetProduct", GetProduct); 

productRoutes.put("/ProductUpdate/:id", Upload.single("image"),ProductUpdateById);

productRoutes.delete("/ProductDelete/:id", ProductDelete);

export default productRoutes;
