import express from "express";
import { AddOrder , GetOrder , GetOrderById , UpdateProduct } from "../controllers/orderController.js";


const orderRoutes = express.Router();

orderRoutes.post("/AddOrder", AddOrder );

orderRoutes.get("/GetOrders",  GetOrder);

orderRoutes.get("/GetOrder/:id", GetOrderById );

orderRoutes.put("/Update/:id", UpdateProduct);


export default orderRoutes;