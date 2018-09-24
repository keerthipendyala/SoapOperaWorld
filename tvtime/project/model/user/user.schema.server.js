module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        type: {type: String, enum: ['student', 'librarian', 'admin']},
        email: String,
        gender: String,
        phone: String,
        major: String,
        school: String,
        dateCreated: {type: Date, default: Date.now},
        libraryId: String,
        books_liked: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookmodel'}],
        books_wished: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookmodel'}],
        banned_list: [{type: mongoose.Schema.Types.ObjectId, ref: 'usermodel'}]
    }, {collection: 'mongo.users'});

    return userSchema;
};