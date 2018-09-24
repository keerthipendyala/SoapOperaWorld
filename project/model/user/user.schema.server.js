module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        type: {type:String,enum :['buyer', 'seller','admin']},
        email: String,
        phone: String,
        shows_forsale:[{showId:String,count:Number}],
        shows_bought:[{showId:String,count:Number}],
        shows_liked:[String],
        shows_wishlist:[String],
        sellers_favourite:[{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}],
        dateCreated:{type:Date,default:Date.now},
        facebook : {
            token : String,
            id :String,
            displayName : String
        }
},{collection: 'mongo.users'});

return userSchema;
};