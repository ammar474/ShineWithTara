import express from "express";
import { AddFaqs , GetFaqs , FaqsDelete} from "../controllers/faqsController.js";

const faqsRoutes = express.Router();

faqsRoutes.post("/AddFaqs", AddFaqs );

faqsRoutes.get("/GetFaqs",GetFaqs);

faqsRoutes.delete("/FaqsDelete/:id",FaqsDelete);

export default faqsRoutes;


