const Product = require("../models");
const { Op } = require("sequelize");
const { Date, formatResponse } = require("../utils");

exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await Product.findAll();

    result
      ? formatResponse(res, 200, result)
      : formatResponse(res, 404, {
          error: "Not found products",
          message: "Not found products"
        });
    next();
  } catch (error) {
    formatResponse(res, 500, {
      success: false,
      message: error
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByPk(id);

    result
      ? formatResponse(res, 200, result)
      : formatResponse(res, 404, {
          success: false,
          message: "Not found product"
        });
  } catch (error) {
    formatResponse(res, 500, {
      success: false,
      message: error
    });
  }
};

exports.getProductByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const result = await Product.findAll({
      where: { category: { [Op.like]: `%${category}%` } }
    });

    result.length
      ? formatResponse(res, 200, result)
      : formatResponse(res, 404, {
          success: false,
          message: "Not found product in this category"
        });
  } catch (error) {
    formatResponse(res, 500, {
      success: false,
      message: error
    });
  }
};

exports.insertProduct = async (req, res) => {
  try {
    const result = await Product.create({
      ...req.body,
      created_at: Date()
    });
    formatResponse(res, 201, { success: true, data: result });
  } catch (error) {
    formatResponse(res, 500, {
      success: false,
      message: error
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Product.update(
      { ...req.body, updated_at: Date() },
      { where: { id } }
    );
    result
      ? formatResponse(res, 200, { success: true, data: req.body })
      : formatResponse(res, 404, {
          success: false,
          message: "Not found product to update"
        });
  } catch (error) {
    formatResponse(res, 500, {
      success: false,
      message: error
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Product.destroy({ where: { id } });

    result === 1
      ? formatResponse(res, 200, { success: true, deletedAt: Date() })
      : formatResponse(res, 404, {
          success: false,
          message: "Not found product to delete"
        });
  } catch (error) {
    formatResponse(res, 500, { success: false, message: error });
  }
};
