import express from "express";
import  authentication from "../middleware/authentication.js"
import {Register , Login , GetUser , GetUserById , AdminLogin} from "../controllers/userController.js"


const router = express.Router();

router.post('/Register' , Register );

router.post('/Login', Login);

router.post('/AdminLogin' , AdminLogin );

router.get("/GetUser",  GetUser);

router.get("/GetUser/:id", authentication , GetUserById);

export default router;



