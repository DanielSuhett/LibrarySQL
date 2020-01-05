const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfig = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfig[env];
const Book = require('../models/Book');

const sequelize = new Sequelize(config.url, config);

Book.init(sequelize);

sequelize
  .authenticate()
  .then(() => console.log('Connect to database success!'))
  .catch(err => console.log(err));

  
module.exports = sequelize