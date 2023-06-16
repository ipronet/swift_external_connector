var axios = require("axios");
module.exports = {
  ConvertApi: async (url,payload) => {
  
    var config = {
      method: "post",
      url: url,
      data:payload
    };
   
    let {data} =   await axios(config);
    return data
  },
};
