import express from "express"
import { AdminLogin } from "../controllers/adminController.js"

const adminRoutes = express.Router(); 
 
adminRoutes.post('/AdminLogin' , AdminLogin );

export default adminRoutes;