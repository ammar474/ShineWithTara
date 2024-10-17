const renameKeys = (dataArray) => {
    const keyMapping = {
        id: "product_id",
        name: "productName",
        price: "price",
        quantity: "quantity",
        image: "image",
      };
    return dataArray.map(obj => {
        let newObj = {};
        for (let key in obj) {
            if (keyMapping[key]) {
                newObj[keyMapping[key]] = obj[key]; 
            } else {
                newObj[key] = obj[key]; 
            }
        }
        return newObj;
    });
  };
  export default renameKeys;
  