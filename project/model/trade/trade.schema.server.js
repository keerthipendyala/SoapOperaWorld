module.exports = function () {
    var mongoose = require('mongoose');
    var tradeSchema = mongoose.Schema({
        showId:String,
        sellerId:{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'},
        buyerId:{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}
    },{collection: 'mongo.trade'});
    return tradeSchema;
};