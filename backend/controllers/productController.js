
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


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

// create review and update the review
exports.createReview = catchAsyncErrors(async (req, res, next)=>{

  const {rating,comment,productId} = req.body

  const review = {
    id : req.user._id ,
    name: req.user.name,
    rating:Number(rating),
    comment
  }

  const product = await productModel.findById(productId);
  if(!product){
    return next(new ErrorHandler("Product Not Exsist",401))
  }
  
  const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

  if(isReviewed){
    
    product.reviews.forEach((rev)=>{
      if( rev.user.toString()===rev.user._id.toString()){
        rev.rating = rating;
        rev.comment=comment;
      }
    })
  } else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  let avg =0;
  product.ratings = product.reviews.forEach((rev)=>{
    avg+=rev.rating
  })
  product.ratings = avg/product.reviews.length;


  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,

  })
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

