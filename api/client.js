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
  
function openData() {
  let ret = {
    cursor_poses: {},
    keys: [],
  }
  fs.readFile("/tmp/data.json", "utf-8", function (err, data) {
    if (err) return;
    const jsonObj = JSON.parse(data);
    ret.cursor_poses = jsonObj.cursor_poses;
    ret.keys = jsonObj.keys;
  });
  return ret;
}

exports.handler = function(event, _) {
  response.body = openData();
  saveData(event);
  return response;
};