require("dotenv").config();

module.exports = {
  development: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: ""
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
