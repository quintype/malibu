---
title: Reverse Proxy
parent: Malibu Tutorial
nav_order: 31

---

In computer networks, a reverse proxy is the application that sits in front of back-end applications and forwards client requests to those applications.

To implement reverse proxy we are using an npm package named `http-proxy`. Here is a sample implementation of reverse proxy:

```
const app = require('express')()
const httpProxy = require("http-proxy");

// target - url string to be targeted
const apiProxy = httpProxy.createProxyServer({
  target: "https://deals.example.com",
  changeOrigin: true,
});

/* ignorePath - true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request (note: you will have to append / manually if required) */

app.get("/deals", (req, res) => {
  apiProxy.web(req, res, { ignorePath: true });
});

```
