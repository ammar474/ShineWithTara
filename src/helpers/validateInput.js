 const validateInput = (requiredFields, reqBody) => {
    const missingFields = requiredFields.filter(field => !reqBody[field]);
    if (missingFields.length > 0) {
     return `Missing fields: ${missingFields.join(', ')}`;
   }
    return null;
   };
 export default validateInput;