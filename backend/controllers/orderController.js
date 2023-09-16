const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler");
const productModel = require("../models/productModel");

// Creating order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user:req.user._id

  })

  res.status(200).json({
    message:"success",
    order
  })
});

// get single order 
exports.getSingleOrder =  catchAsyncError(async (req ,res ,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }

    res.status(200).json({
        message:'success',
        order
    })
})


// get logged in user order 
exports.myOrders = catchAsyncError( async (req ,res ,next)=>{
    const orders = await Order.find({user:req.user._id})


    res.status(200).json({
        message:'success',
        orders
    })
})
// get All orders --Admin
exports.getAllOrders = catchAsyncError( async (req ,res ,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order=>{
      totalAmount += order.totalPrice;
    }))

    res.status(200).json({
        message:'success',
        totalAmount,
        orders
    })
})


// update order status --Admin
exports.updateOrder = catchAsyncError( async (req ,res ,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
      return next(new ErrorHandler("Order not found with this id",404))
  }
  

    if(order.orderStatus==='Delivered'){
      return next(new ErrorHandler("you have Already delivered this product",400))
    }

    order.orderItems.forEach(async (o)=>{
      await updateStock(o.product,o.quantity)
    })

    order.orderStatus = req.body.status;

    if(req.body.status === 'Delivered'){
      order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        message:'success',
        
    })
});

async function updateStock(id,quantity){
  const product = await productModel.findById(id);

  product.stock -= quantity;

  await product.save({validateBeforeSave:false});
}

// Delete Order --Admin

exports.deleteOrder = catchAsyncError( async (req ,res ,next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler("Order not found with this id",404))
}

  await order.deleteOne()

  res.status(200).json({
      message:'Order Deleted Successfully',
  })
})
