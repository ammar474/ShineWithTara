import mongoose from "mongoose";
import express from "express";
import { URL } from "./config/config.js";
import userRouter from "./src/routes/userRoute.js";
import orderRoutes from "./src/routes/orderRoute.js";
import reviewsRoutes from "./src/routes/reviewsRoute.js";
import productRoutes from "./src/routes/productsRoute.js";
import faqsRoutes from "./src/routes/faqsRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";



const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: [
        "http://localhost:3001",
    ]
}));

  
app.use(
    "/public/uploads",
    express.static(path.join(__dirname, "public/uploads"))
    
  );
dotenv.config();
app.use("/User", userRouter);
app.use("/Order", orderRoutes);
app.use("/Product", productRoutes);
app.use("/Reviews", reviewsRoutes);
app.use("/Faqs", faqsRoutes);

//test console

const PORT = process.env.PORT || 3000;
mongoose
    .connect(URL)
    .then(() => {
        console.log(`data base connected`);
        app.listen(PORT, () => {
            console.log(`server is runnung on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message)
    });
