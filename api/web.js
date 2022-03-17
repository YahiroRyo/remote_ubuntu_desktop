const response = {
  statusCode: 200,
  headers: {},
  body: {}
};

const fs = require("fs");

function openData() {
  let ret = {
    imgs: [],
  }
  for (let i = 0; i < 16; i++) {
    fs.readFile(`/tmp/${i}.jpg`, "utf-8", function (err, data) {
      if (err) return;
      ret.imgs.push(data);
    });
  }
  return ret;
}

function saveData(event) {
  const data = {
    cursor_poses: event.cursor_poses,
    keys: event.keys,
  }
  fs.writeFile("/tmp/data.json", JSON.stringify(data), null, () => {
  });
}

exports.handler = function(event, _) {
  response.body = openData();
  saveData(event);
  return response;
};