module.exports = function () {
    var mongoose = require('mongoose');

    var widgetSchema = mongoose.Schema({
        order:{type:Number,default:0},
        name: String,
        type: {type:String,enum :['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT' , 'TEXT']},
        title:String,
        text:String,
        placeholder:String,
        description: String,
        _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'pageModel'}],
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        dateCreated:{type:Date,default:Date.now}
    },{collection: 'mongo.widget'});

    return widgetSchema;
};