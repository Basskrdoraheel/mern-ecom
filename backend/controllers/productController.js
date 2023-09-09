
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const userModel = require("../models/userModel");

// create product --Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  console.log(req.body.user);
  
  const product = await productModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// update the product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    // Find the product by ID
    let product = await productModel.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }

    // Update the product and await the result
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    // Check if the product was updated successfully
    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }

    // Respond with a success message and the updated product
    res.status(200).json({
      success: true,
      message: "Updated Successfully!",
      product,
    });
  } catch (error) {
    // Handle any errors that occur during execution
    next(error);
  }
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

