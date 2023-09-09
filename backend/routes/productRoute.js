const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/productController');
const { isAuthenticatedUser,authorizedRole } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,authorizedRole("admin"),createProduct)
router.route("/product/:id")
.put(isAuthenticatedUser,authorizedRole("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizedRole("admin"),deleteProduct)
.get(getSingleProduct)



module.exports = router;