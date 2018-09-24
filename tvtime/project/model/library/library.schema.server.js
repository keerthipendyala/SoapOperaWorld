module.exports = function () {
    var mongoose = require('mongoose');

    var librarySchema = mongoose.Schema({
        name: String,
        location: String,
        books: [{bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'bookmodel'}, count: Number}]
    }, {collection: 'mongo.library'});

    return librarySchema;
};