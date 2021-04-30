const {
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductByCategory,
  insertProduct,
  updateProduct
} = require("../controller");
const router = require("express").Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.get("/category", getProductByCategory);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", insertProduct);

module.exports = (app) => app.use("/", router);
