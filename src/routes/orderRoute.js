import express from "express";
import { AddOrder , GetOrder , GetOrderById , UpdateProduct } from "../controllers/orderController.js";
import authentication from "../middleware/authentication.js";


const orderRoutes = express.Router();

orderRoutes.post("/AddOrder", AddOrder );

orderRoutes.get("/GetOrders",authentication ,  GetOrder);

orderRoutes.get("/GetOrder/:id", GetOrderById );

orderRoutes.put("/Update/:id", UpdateProduct);


export default orderRoutes;