const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = mongoose.Schema({
    // writer:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // },
    title:{
        type:String,
        maxlength:50
    },
    data:{
        type:String,
    },
    thumbnail :{
        type:String,
    },
    

    
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


const Article = mongoose.model('Article', articleSchema);

module.exports = { Article }