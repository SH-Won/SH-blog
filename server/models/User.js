const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const { verify, refreshVerify ,refresh,sign } = require('../middleware/jwt');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    }, 
    role : {
        type:Number,
        default: 0 
    },
    image: {
        type:String,
        default:''
    },
    favorite:{
        type:Array,
        default:[],
    }
    ,
    token : {
        type: String,
    },
    refreshToken:{
        type:String,
    },
    tokenExp :{
        type: Number
    },
})


userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();
    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

// userSchema.statics.findByToken = function (token, cb) {
//     var user = this;

//     jwt.verify(token,'secret',function(err, decode){
        
//         user.findOne({"_id":decode, "token":token}, function(err, user){
//             if(err) return cb(err);
//             cb(null, user);
//         })
//     })
// }
userSchema.statics.findByToken = function (token,refreshToken,cb){
    var user = this;
    const result = verify(token);
    // console.log(result);
    if(!token && !refreshToken) return cb();

    if(result.success){
        user.findOne({_id:result.id},(err,user) =>{
            if(err) return cb(err);
            return cb(null,user,token);
        })
    }else{
        const userInfo = jwt.decode(token);
        const refreshResult = refreshVerify(refreshToken);

            if(!refreshResult) cb();
            else{
                user.findOne({_id:userInfo.id},(err,user) =>{
                    if(err) return cb();
                    
                    if(user.refreshToken === refreshToken){
                       
                        const newToken = sign(user);
                        return cb(null,user,newToken);
                    }
                    return cb();
                })
            }
    }
}
userSchema.statics.refresh = function(){

}

const User = mongoose.model('User', userSchema);

module.exports = { User }