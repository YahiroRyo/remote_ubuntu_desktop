const response = {
    statusCode: 200,
    headers: {},
    body: {}
  };
  
  const fs = require("fs");
  
  function saveData(event) {
    for (let i = 0; i < event.imgs.length; i++) {
      fs.writeFile(`/tmp/${i}.jpg`, event.imgs[i]);
    }
  }
  
  exports.handler = function(event, _) {
    response.body = saveData(event);
    return response;
  };