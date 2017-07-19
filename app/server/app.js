const compression = require('compression');
const express = require('express');

const app = express();
const client = require("./client");

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

app.get("/foobar", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send("<html><head><link rel='stylesheet' type='text/css' href='/toddy/assets/app.css'></head><body>Foo<script src='http://localhost:8080/toddy/assets/app.js' async></script></body></html>");
})

module.exports = function startApp() {
  return client.getConfig()
    .then(function() {
       app.listen(3000, function () {
         console.log('Example app listening on port 3000!');
       });
    });
}
