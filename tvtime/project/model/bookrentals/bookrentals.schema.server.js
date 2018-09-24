module.exports = function () {
    var mongoose = require('mongoose');

    var bookRentalsSchema = mongoose.Schema({
        libraryId: {type: mongoose.Schema.Types.ObjectId, ref: 'librarymodel'},
        librarianId: {type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'},
        bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'bookmodel'},
        studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'},
        dateIssued: Date,
        dateReturned : Date,
        returned: {type : Boolean}
    }, {collection: 'mongo.bookrental'});
    return bookRentalsSchema;
};
