const { red } = require('colors');
const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');



// create product --Admin

exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await productModel.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
})

// update the product --Admin 
exports.updateProduct= catchAsyncErrors(async (req , res,next)=>{
    // console.log(req.params.id)
    // console.log(req.body)
    let product = await productModel.findById(req.params.id);


    if (!product){
        return next(new ErrorHandler("Product not Found",404))
    }


    product = productModel.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,
    useFindAndModify:false

})
}
)

// get all products  --Public
exports.getAllProducts = catchAsyncErrors(async (req,res,next)=>{
    const products = await productModel.find();
    if (!products){
        return next(new ErrorHandler("Product not Found",404))
    }

    res.status(200).json({
        success:true,
        products
    })
}
)
// delete the product  --Admin
exports.deleteProduct= catchAsyncErrors(async(req,res,next)=>{
    let product = await productModel.findById(req.params.id);
    if (!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    await product.deleteOne()

    res.status(200).json({
        success : true,
        message:"Product Deleted Successfully",
    })

})


// get single product
exports.getSingleProduct= catchAsyncErrors(async(req,res,next)=>{
    let product = await productModel.findById(req.params.id);
    if (!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    res.status(200).json({
        success : true,
        product
    })

})