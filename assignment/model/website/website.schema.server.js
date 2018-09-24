module.exports = function () {
    var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        name: String,
        description: String,
        _user: [{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}],
         pages:[{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
        dateCreated:{type:Date,default:Date.now}
    },{collection: 'mongo.website'});

    return websiteSchema;
};