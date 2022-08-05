const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
    {
        // writer:{
        //     type:Schema.Types.ObjectId,
        //     ref:'User'
        // },
        title: {
            type: String,
            maxlength: 50,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String,
            default: '',
        },
        imageUrls: {
            type: Array,
            default: [],
        },
        category: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true },
);

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

module.exports = { Post };
