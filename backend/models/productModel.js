const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a Name']
    },
    description:{
        type : String ,
        required  : [ true ,' Please Add A Description'],
    },
    price:{
        type:Number,
        required:[true,"please enter the Price"],
        maxLength: [8,"Price can't exceed 8 characters"]
    },
    rating:{
        type: Number,
        default: 0
    },

    image:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        
        }
        }
    ],
    category:{
        type: String,
        required:[true,"Please Enter Product Category"]
    },

    stock:{
        type:Number,
        required:[true,"Please Enter Stock"],
        maxLength:[4,"Stock Can't Exceed 4 Characters"],
        default:1
    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }


})


module.exports = mongoose.model('product',productSchema)