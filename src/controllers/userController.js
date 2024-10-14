import { User } from "../model/userModel.js";
import fieldValidate from "../helpers/validateInput.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 
export const Register =  async (req, res) => { 
    const {name , email, password } = req.body;
    // if ( !name , !email || !password) {
    //   return res.status(400).json({ message: 'email and password are required' });
    // }
    const error = validateInput(['name', 'email', 'password'], req.body);

    if(error){return res.status(400).json({ message: 'email and password are required' })}

    if (email === process.env.Email && password === process.env.Password) {
       return res.status(400).json({ message: 'email already in used' });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'email already in used' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword
      });
      const newUser = await user.save();
      if (newUser) { return res.status(200).json({ message: 'user registered successfully' }); }
       return res.status(400).json({ message: 'user not register' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message});
    }
};

export const Login = async (req ,res) => {
    const { email, password } = req.body;
     const lastLoginDate = new Date();
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
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
           await User.findByIdAndUpdate(user.id , {lastLogin : lastLoginDate})
        
    const token = jwt.sign({  userId: user._id  , role : "user"  }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token, message: ' User Login successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }

}

export const AdminLogin =  (req , res) => {
  const { email , password } = req.body
  if(!email || !password){
    res.status(400).send({message : "fill the required fields"});
  }else if(email === process.env.Email && password === process.env.Password){
    const token = jwt.sign({role : "admin"}, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ token, message: 'admin Login successful' });
  }else{
    res.status(400).send({message : "Invalid Credentials"});
  }

} 

export const GetUser = async (req , res ) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
      try {
        const getUserData = await User.find().skip(skip).limit(limit);
        if (getUserData) { return res.status(200).send({ getUserData }) }
        else {
          return res.status(404).send({ message: "data not found" });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
      }
   
     
 
}

export const GetUserById = async (req , res ) => {
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
}