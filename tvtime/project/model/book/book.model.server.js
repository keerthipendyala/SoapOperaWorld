module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var bookSchema = require('./book.schema.server')();

    var bookmodel = mongoose.model('bookmodel', bookSchema);

    var api = {
        createBook: createBook,
        findBookByIsbn: findBookByIsbn,
        findBookById: findBookById,
        likethebook: likethebook,
        addtowishlist: addtowishlist,
        removefromwishlist: removefromwishlist,
        undolike:undolike
    };
    return api;

    function createBook(newbook) {
        var deffered = q.defer();
        bookmodel
            .create(newbook, function (err, book) {
                if (err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(book);
                }
            });
        return deffered.promise;
    }

    function findBookByIsbn(isbn) {
        var deferred = q.defer();
        bookmodel
            .findOne({bookIsbn: isbn})
            .then(function (book, err) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(book);
                }
            });
        return deferred.promise;
    }

    function findBookById(bookId) {
        var deferred = q.defer();
        bookmodel
            .findOne({_id: bookId})
            .then(function (book, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(book);
                }
            });
        return deferred.promise;
    }

    function likethebook(userId, bookId) {
        var deferred = q.defer();
        bookmodel
            .findOne({_id: bookId}, function (err, book) {
                book.users_liked.push(userId);
                book.save();
                deferred.resolve(book);
            });
        return deferred.promise;
    }

    function addtowishlist(userId, bookId) {
        var deferred = q.defer();
        bookmodel
            .findOne({_id: bookId}, function (err, book) {
                book.users_wished.push(userId);
                book.save();
                deferred.resolve(book);
            });
        return deferred.promise;
    }

    function removefromwishlist(userId, bookId) {
        var deferred = q.defer();
        bookmodel
            .findOne({_id: bookId}, function (err, book) {
                var index = book.users_wished.indexOf(userId);
                book.users_wished.splice(index, 1);
                book.save();
                deferred.resolve(book);
            });
        return deferred.promise;
    }

    function undolike(userId, bookId) {
        var deferred = q.defer();
        bookmodel
            .findOne({_id: bookId}, function (err, book) {
                var index = book.users_liked.indexOf(userId);
                book.users_liked.splice(index, 1);
                book.save();
                deferred.resolve(book);
            });
        return deferred.promise;
    }
};