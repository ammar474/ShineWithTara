import express from "express";
import { AddReviews , GetReviews , ReviewsDelete} from "../controllers/reviewsController.js";


const reviewsRoutes = express.Router();

reviewsRoutes.post("/AddReviews", AddReviews );

reviewsRoutes.get("/GetReviews", GetReviews);

reviewsRoutes.delete("/ReviewsDelete/:id", ReviewsDelete );


export default reviewsRoutes;