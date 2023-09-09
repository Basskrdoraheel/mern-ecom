
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// create product --Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  
  const product = await productModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// update the product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.params.id)
  // console.log(req.body)
  let product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  product = productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
});

// get all products  --Public
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productsCount = await productModel.countDocuments();
  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  if (!products) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productsCount
    
  });
});
// delete the product  --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// get single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    

  });
});
