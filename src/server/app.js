const compression = require('compression');
const express = require('express');

const app = express();

app.use(express.static("public"));
app.use(compression());

app.get("/ping", function(req, res) {
  res.send("pong");
});

module.exports = function startApp() {
  return new Promise((resolve) => resolve())
  .then(function() {
     app.listen(3000, function () {
       console.log('Example app listening on port 3000!');
     });
  });
}
