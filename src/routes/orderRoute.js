import express from "express";
import { AddOrder , GetOrder , GetOrderById , UpdateProduct , GetOrderByUserId  } from "../controllers/orderController.js";
import authentication from "../middleware/authentication.js";


const orderRoutes = express.Router();

orderRoutes.post("/AddOrder", AddOrder );

orderRoutes.get("/GetOrders", GetOrder);

orderRoutes.get("/GetOrder/:id", GetOrderById );

orderRoutes.get("/GetOrderByUserId/:userId", GetOrderByUserId);

orderRoutes.put("/Update/:id", UpdateProduct);


export default orderRoutes;