import express from "express";
import { Order } from "../model/orderModel.js";


const orderRoutes = express.Router();

orderRoutes.post("/AddOrder", async (req, res) => {
   const { customerName, items, totalAmount, orderStatus } = req.body
   if (!customerName || !items || !totalAmount || !orderStatus) {
      return res.status(400).send({ message: "fill the field properly" });
   }
   try {

      const addOrder = new Order({
         customerName,
         items,
         totalAmount,
         orderStatus
      })
      const newOrder = await addOrder.save();
      if (newOrder) { return res.status(200).send({ order: newOrder }) }
      else {
         return res.status(400).send({ message: "add order properly" })
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
   }

});

orderRoutes.get("/GetOrders",   async (req, res) => {
   try {
      const getOrderData = await Order.find();
      if (getOrderData) { return res.status(200).send({ getOrderData }) }
      else {
         return res.status(404).send({ message: "data not found" });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
   }
});

orderRoutes.get("/GetOrder/:id", async (req, res) => {
   try {
      const { id } = req.params
      const getOrderDataById = await Order.findById(id);
      if (getOrderDataById) { return res.status(200).send({ getOrderDataById }) }
      else {
         return res.status(404).send({ message: "data not found" });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
   }
});

orderRoutes.put("/Update/:id", async (req, res) => {
 
   const{ orderStatus }= req.body
   if (!orderStatus) {
      return res.status(400).send({ message: "id or field missing" });
   }
   try {
      
      const {id}  = req.params
      const updatedOrderStatus = await Order.findByIdAndUpdate(id, {orderStatus} , { new: true, useFindAndModify: false });
    
      return res.status(200).send({ updatedOrderStatus });

   } catch (error) {
      console.log(error);
      return res.status(400).send({ updatedOrderStatus });
   }

});


export default orderRoutes;