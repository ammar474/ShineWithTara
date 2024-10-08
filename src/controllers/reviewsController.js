import { Reviews } from "../model/reviewsModel.js";

export const AddReviews = async (req ,res) => {
    const { name, comment, rating } = req.body
    if (!name || !comment || !rating) {
      return res.status(200).send({ message: "fill the field properly" });
    }
    try {
      const newReviews = new Reviews({
        name,
        comment,
        rating
      })
      const addReviews = await newReviews.save()
      if (addReviews) { return res.status(200).send({ addReviews }); }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
}

export const GetReviews = async (req ,res) => {
    try {
        const GetReviews = await Reviews.find()
         if (GetReviews) { return res.status(200).send({ GetReviews }); }
       } catch (error) {
         console.log(error);
         return res.status(500).send({ message: error.message });
     }
}

export const ReviewsDelete = async (req , res ) => {
    try {
        const { id } = req.params
        const result = await Reviews.findByIdAndDelete(id);
        if (result) { return res.status(200).send({ message: "reviews deleted", result }) }
      }
      catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
      }
}
