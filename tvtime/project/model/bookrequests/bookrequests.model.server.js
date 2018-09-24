module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var bookrequestsSchema = require('./bookrequests.schema.server')();

    var bookrequestsmodel = mongoose.model('bookrequestsmodel', bookrequestsSchema);

    var api = {
        createBookRequest: createBookRequest,
        findRequestsById: findRequestsById,
        findRequestsByLibraryId: findRequestsByLibraryId,
        removeBookRequest:removeBookRequest
    };
    return api;

    function createBookRequest(newbookreq) {
        var deffered = q.defer();
        bookrequestsmodel
            .create(newbookreq, function (err, book) {
                if (err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(book);
                }
            });
        return deffered.promise;
    }

    function findRequestsById(bookId, studentId) {
        var deferred = q.defer();
        bookrequestsmodel
            .find({bookId: bookId, studentId: studentId})
            .then(function (bookrequest, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(bookrequest);
            });
        return deferred.promise;
    }

    function findRequestsByLibraryId(lid) {
        var deferred = q.defer();
        bookrequestsmodel
            .find({libraryId: lid})
            .then(function (bookrequest, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(bookrequest);
            });
        return deferred.promise;
    }


    function removeBookRequest(lid, bookId, studentId) {
        var deferred = q.defer();
        bookrequestsmodel
            .remove({libraryId: lid, bookId: bookId, studentId: studentId}, function (err, user) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
};