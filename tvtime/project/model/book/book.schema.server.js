module.exports = function () {
    var mongoose = require('mongoose');

    var bookSchema = mongoose.Schema({
        bookIsbn: String,
        title: String,
        image: String,
        users_liked: [{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}],
        users_wished: [{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}]
    }, {collection: 'mongo.book'});
    return bookSchema;
};
