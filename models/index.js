const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        bar_code: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.NUMBER,
        category: DataTypes.STRING
      },
      {
        sequelize,
        underscored: true
      }
    );
  }
}

module.exports = Product;
