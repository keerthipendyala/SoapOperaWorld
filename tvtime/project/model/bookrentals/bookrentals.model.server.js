module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var bookRentalsSchema = require('./bookrentals.schema.server')();

    var bookrentalsmodel = mongoose.model('bookrentalsmodel', bookRentalsSchema);

    var api = {
        acceptBookRental: acceptBookRental,
        findRentalsById: findRentalsById,
        findRentalsByLibraryId: findRentalsByLibraryId,
        returnBook: returnBook
    };
    return api;

    function acceptBookRental(newbookreq) {
        var deffered = q.defer();
        bookrentalsmodel
            .create(newbookreq, function (err, book) {
                if (err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(book);
                }
            });
        return deffered.promise;
    }


    function findRentalsById(studentId) {
        var deferred = q.defer();
        bookrentalsmodel
            .find({studentId: studentId})
            .then(function (bookrental, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(bookrental);
            });
        return deferred.promise;
    }


    function returnBook(rentalId, dateReturned) {
        var deferred = q.defer();
        bookrentalsmodel
            .update({_id: rentalId},
                {$set: {returned: true, dateReturned: dateReturned}})
            .then(function (rental, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(rental);
                }
            });
        return deferred.promise;
    }

    function findRentalsByLibraryId(lid) {
        var deferred = q.defer();
        bookrentalsmodel
            .find({libraryId: lid})
            .then(function (bookrental, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(bookrental);
            });
        return deferred.promise;
    }
};