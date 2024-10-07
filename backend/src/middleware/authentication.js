import jwt from "jsonwebtoken"



const authentication = (req , res , next) =>{
    const authHeaders = req.header('Authorization');
    const token = authHeaders && authHeaders.split(' ')[1];
    if(!token){
       return res.status(401).send({message : "please using a valid token"})
     } 
      try {
        const data = jwt.verify(token , process.env.SECRET_KEY);   
        req.user = data
      next();
      } catch (error) {
         return res.status(401).send({message : error})
      }
}

export default authentication;