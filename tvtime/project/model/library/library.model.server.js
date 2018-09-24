module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var librarySchema = require('./library.schema.server')();

    var librarymodel = mongoose.model('librarySchema', librarySchema);

    var api = {
        findLibraryById: findLibraryById,
        findAllLibraries: findAllLibraries,
        addBookToLibrary: addBookToLibrary,
        findLibraryByBookId: findLibraryByBookId,
        reduceInventoryCount: reduceInventoryCount,
        addToInventory:addToInventory
    };
    return api;

    function findLibraryById(libraryId) {
        var deferred = q.defer();
        librarymodel
            .findById({_id: libraryId})
            .then(function (library, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(library);
                }
            });
        return deferred.promise;
    }

    function findAllLibraries() {
        var deferred = q.defer();
        librarymodel
            .find()
            .then(function (libraries, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(libraries);
                }
            });
        return deferred.promise;
    }

    function addBookToLibrary(count, bookId, lid, libraryId) {
        var deferred = q.defer();
        var isPresent = false;
        librarymodel
            .findOne({_id: libraryId})
            .then(function (library, err) {
                var newlib = library;
                if (err)
                    deferred.abort(err);
                else {
                    for (var i = 0; i < library.books.length; i++) {
                        if (library.books[i].bookId == bookId) {
                            isPresent = true;
                            newlib.books[i].count = parseInt(newlib.books[i].count) + parseInt(count);
                        }
                    }

                    if (isPresent === true) {
                        librarymodel
                            .update({_id: libraryId},
                                {$set: newlib})
                            .then(function (library, err) {
                                if (err)
                                    deferred.abort(err);
                                else {
                                    deferred.resolve(library);
                                }
                            });
                    }
                    if (isPresent === false) {
                        library.books.push({bookId: bookId, count: count});
                        library.save();
                        deferred.resolve(library);
                    }
                }
            });
        return deferred.promise;
    }


    function addToInventory(libraryId, bookId) {
        var deferred = q.defer();
        librarymodel
            .findOne({_id: libraryId})
            .then(function (library, err) {
                var newlib = library;
                if (err)
                    deferred.abort(err);
                else {
                    for (var i = 0; i < library.books.length; i++) {
                        if (library.books[i].bookId == bookId) {
                            newlib.books[i].count = parseInt(newlib.books[i].count) + 1;
                            librarymodel
                                .update({_id: libraryId},
                                    {$set: newlib})
                                .then(function (library, err) {
                                    if (err)
                                        deferred.abort(err);
                                    else {
                                        deferred.resolve(library);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function reduceInventoryCount(libraryId, bookId) {
        var deferred = q.defer();
        librarymodel
            .findOne({_id: libraryId})
            .then(function (library, err) {
                var newlib = library;
                if (err)
                    deferred.abort(err);
                else {
                    for (var i = 0; i < library.books.length; i++) {
                        if (library.books[i].bookId == bookId) {
                            newlib.books[i].count = parseInt(newlib.books[i].count) - 1;
                            librarymodel
                                .update({_id: libraryId},
                                    {$set: newlib})
                                .then(function (library, err) {
                                    if (err)
                                        deferred.abort(err);
                                    else {
                                        deferred.resolve(library);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }


    function findLibraryByBookId(bookId) {
        var deferred = q.defer();
        librarymodel
            .find({'books.bookId': bookId})
            .then(function (libraries, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(libraries);
                }
            });
        return deferred.promise;
    }
};