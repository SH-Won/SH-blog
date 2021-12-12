const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    // writer:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String
    },
    // price:{
    //     type:String,
    //     default:'0'
    // },
    // images:{
    //     type:Array,
    //     default:[]
    // },
    imageUrl :{
        type:String,
        default:''
    },
    category:{
        type:Number,
        default:1
    },
    // sold:{
    //     type:Number, 
    //     maxlength:100,
    //     default:0
    // },
    // views:{
    //     type:Number,
    //     default:0
    // },
    // likeUser:{
    //     type:Array,
    // },
    // disLikeUser:{
    //     type:Array
    // },
    

    
},{timestamps:true})

// postSchema.index({
//     title:'text',
//     description:'text',
// },{
//     weights:{
//         title:5,
//         description:1,
//     }

// })


const Post = mongoose.model('Post', postSchema);

module.exports = { Post }