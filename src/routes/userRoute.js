import express from "express";
import { User } from "../model/userModel.js";
import  authentication from "../middleware/authentication.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post('/Register', async (req, res) => { 
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if (email === process.env.Email && password === process.env.Password) {
    return res.status(400).json({ message: 'already in use' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword
    });
    const newUser = await user.save();
    if (newUser) { return res.status(201).json({ message: 'User registered successfully' }); }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: error.message});
  }
});

router.post('/Login', async (req, res) => {


  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  else if (email === process.env.Email && password === process.env.Password) {
    const token = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token, message: 'admin Login successful' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token, message: ' User Login successful' });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/GetUser", authentication ,   async (req, res) => {
  try {
    const getUserData = await User.find();
    if (getUserData) { return res.status(200).send({ getUserData }) }
    else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/GetUser/:id", authentication , async (req, res) => {
  try {
    const { id } = req.params
    const getUserById = await User.findById(id);
    if (getUserById) { return res.status(200).send({ getUserById }) }
    else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

export default router;



