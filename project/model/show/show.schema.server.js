module.exports = function () {
    var mongoose = require('mongoose');

    var showSchema = mongoose.Schema({
        showId:String,
        comments:[String],
        count:Number,
        sellers:[String],
        users_liked:[{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}],
        trades:[{type: mongoose.Schema.Types.ObjectId, ref: 'trademodel'}]
    },{collection: 'mongo.show'});
    return showSchema;
};