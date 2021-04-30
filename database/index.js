const Sequelize = require("sequelize");
const envConfig = require("./config");
const env = process.env.NODE_ENV || "development";
const { database, username, password, host, dialect } = envConfig[env];
const Product = require("../models");

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect,
  logging: false
});

Product.init(sequelize);

sequelize
  .authenticate()
  .then(() => env !== "test" && console.log("Connect to database success!"))
  .catch((err) => console.log(err));

module.exports = sequelize;
