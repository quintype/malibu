const { startApp } = require("@quintype/framework/server/start");

startApp(() => require("./app/server/app.js").app);
