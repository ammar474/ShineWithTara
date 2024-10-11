import jwt from "jsonwebtoken"



const authentication = (req , res , next) =>{
    const authHeaders = req.header('Authorization');
    const token = authHeaders && authHeaders.split(' ')[1];
    console.log( "auth Token ",token);
    if(!token){
       return res.status(401).send({message : "please using a valid token"})
     } 
      try {
        const data = jwt.verify(token , process.env.SECRET_KEY);   
        console.log(data);
        req.data = data
      next();
      } catch (error) {
         return res.status(401).send({message : error})
      }
}

export default authentication;