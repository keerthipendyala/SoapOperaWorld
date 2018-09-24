module.exports = function () {
    var mongoose = require('mongoose');

    var bookRequestsSchema = mongoose.Schema({
        libraryId : {type: mongoose.Schema.Types.ObjectId, ref: 'librarymodel'},
        bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'bookmodel'},
        studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}
    }, {collection: 'mongo.bookrequest'});
    return bookRequestsSchema;
};
