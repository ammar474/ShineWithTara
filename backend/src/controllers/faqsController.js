import { Faqs } from "../model/faqsModel.js";

export const AddFaqs = async (req , res) => {
    const { question, answer } = req.body
    if (!question || !answer) {
        return res.status(200).send({ message: "fill the field properly" });
    }
    try {
        const newFaqs = new Faqs({
            question,
            answer
        })
        const AddFaqs = await newFaqs.save()
        if (AddFaqs) { return res.status(200).send({ AddFaqs }); }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const GetFaqs = async (req ,res) => {
    try {
        const GetFaqs = await Faqs.find();
        if (GetFaqs) { return res.status(200).send({ GetFaqs }) }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }

}

export const FaqsDelete = async (req ,res) => {
    try {
        const { id } = req.params
        const result = await Faqs.findByIdAndDelete(id);
        if (result) { return res.status(200).send({ message: "faqs deleted", result }) }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}