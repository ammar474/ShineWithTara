import jwt from "jsonwebtoken";

export const AdminLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "fill the required fields" });
    } else if (email === process.env.Email && password === process.env.Password) {
      const token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, message: "admin Login successful" });
    } else {
      res.status(400).send({ message: "Invalid Credentials" });
    }
  };