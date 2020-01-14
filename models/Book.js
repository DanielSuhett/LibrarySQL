const { Model, DataTypes } = require('sequelize');

class Book extends Model {
  static init(sequelize){
    super.init({
      title: DataTypes.STRING,
      author: DataTypes.STRING    
    }, {
      sequelize,
      underscored: true
    })
  }
}

module.exports = Book