module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        name: String,
        title:String,
        description: String,
        _website: [{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}],
        widgets:[{type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel'}],
        dateCreated:{type:Date,default:Date.now}
    },{collection: 'mongo.page'});

    return pageSchema;
};