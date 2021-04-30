const express = require("express");
const app = express();
require("dotenv").config();

require("./database");
require("./middleware")(app, express);
require("./routes")(app);

if (process.env.NODE_ENV !== "test")
  app.listen(3000, () => {
    console.log(`Server on 3000`);
  });

module.exports = app;
