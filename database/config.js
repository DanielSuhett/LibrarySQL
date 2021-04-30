require("dotenv").config();

module.exports = {
  development: {
    username: "daniels",
    password: "daniels",
    database: "Products",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "daniels",
    password: "daniels",
    database: "test",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    username: "daniels",
    password: "daniels",
    database: "Products",
    host: "localhost",
    dialect: "mysql"
  }
};
