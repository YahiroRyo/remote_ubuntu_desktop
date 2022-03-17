const web = require('./web.js');
const client = require('./client.js');
import express from "express";

const app = express();

const allowCrossDomain = function(req: express.Request, res: express.Response, next: () => void) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

app.get("/web", (req, res) => {
  res.send(web.handler(req, null));
});
app.get("/client", (req, res) => {
  res.send(client.handler(req, null));
});

app.listen(8080, "0.0.0.0");