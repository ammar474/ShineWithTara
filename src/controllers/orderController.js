import { Order } from "../model/orderModel.js";
import renameKeys from "../helpers/renameKeys.js";

export const AddOrder = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    email,
    phone,
    address,
    items,
    totalAmount,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !items ||
    !totalAmount ||
    !userId
  ) {
    return res.status(400).send({ message: "fill the field properly" });
  }
   const newItems = renameKeys(items);
   try {
    const addOrder = new Order({
      userId,
      firstName,
      lastName,
      email,
      phone,
      address,
      items : newItems,
      totalAmount,
    });
    const newOrder = await addOrder.save();
    if (newOrder) {
      return res.status(200).send({ order: newOrder });
    } else {
      return res.status(400).send({ message: "add order properly" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export const GetOrder = async (req, res) => {
  try {
    const getOrderData = await Order.find().sort({ createdAt: -1 });
    if (getOrderData) {
      return res.status(200).send({ getOrderData });
    } else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const GetOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const getOrderDataById = await Order.findById(id);
    if (getOrderDataById) {
      return res.status(200).send({ getOrderDataById });
    } else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const GetOrderByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(404).send({ message: "userId not found" });
    }
    const userOrder = await Order.find({ userId }).sort({ createdAt: -1 });
    if (userOrder) {
      return res.status(200).send({ userOrder });
    } else {
      return res.status(404).send({ message: "order not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export const UpdateProduct = async (req, res) => {
  const { orderStatus } = req.body;
  if (!orderStatus) {
    return res.status(400).send({ message: "id or field missing" });
  }
  try {
    const { id } = req.params;
    const updatedOrderStatus = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).send({ updatedOrderStatus });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ updatedOrderStatus });
  }
};
