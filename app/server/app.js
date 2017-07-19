const compression = require('compression');
const express = require('express');

const app = express();
const client = require("./client");

const {renderLayout} = require("./render-layout");

app.use(express.static("public"));
app.use(compression());

app.get("/ping", function(req, res) {
  client
  .getConfig()
  .then(() => res.send("pong"))
  .catch(() =>
    res
    .status(503)
    .send({error: {message: "Config not loaded"}})
  );
});

const sketchesProxy = require("./sketches-proxy");
app.all("/api/*", sketchesProxy);
app.all("/login", sketchesProxy);
app.all("/qlitics.js", sketchesProxy);
app.all("/auth.form", sketchesProxy);
app.all("/auth.callback", sketchesProxy);
app.all("/auth", sketchesProxy);
app.all("/admin/*", sketchesProxy);
app.all("/sitemap.xml", sketchesProxy);
app.all("/sitemap/*", sketchesProxy);
app.all("/feed", sketchesProxy);
app.all("/rss-feed", sketchesProxy);
app.all("/stories.rss", sketchesProxy);
app.all("/news_sitemap.xml", sketchesProxy);

app.set("view engine", "ejs");

app.get("/foobar", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  renderLayout(res, {
    content: "Foobar"
  });
})

module.exports = function startApp() {
  return client.getConfig()
    .then(function() {
       app.listen(3000, function () {
         console.log('Example app listening on port 3000!');
       });
    });
}
