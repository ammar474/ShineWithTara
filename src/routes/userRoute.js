import express from "express";
import  authentication from "../middleware/authentication.js"
import {Register , Login , GetUser , GetUserById } from "../controllers/userController.js"


const router = express.Router();

router.post('/Register' , Register );

router.post('/Login', Login);

router.get("/GetUser",GetUser);

router.get("/GetUser/:id", GetUserById);

export default router;



