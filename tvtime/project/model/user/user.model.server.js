module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();

    var usermodel = mongoose.model('usermodel', userSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserByUserId: findUserByUserId,
        likethebook: likethebook,
        addtowishlist: addtowishlist,
        removefromwishlist: removefromwishlist,
        undolike: undolike,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        addToBannedList:addToBannedList
    };
    return api;

    function createUser(newuser) {
        var deffered = q.defer();
        usermodel
            .create(newuser, function (err, user) {
                if (err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(user);
                }
            });
        return deffered.promise;
    }

    function findUserByUserId(userId) {
        var deferred = q.defer();
        usermodel
            .findById({_id: userId})
            .then(function (user, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        usermodel
            .findOne({username: username})
            .then(function (user, err) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        usermodel
            .findOne({username: username, password: password})
            .then(function (user, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function likethebook(userId, bookId) {
        var deferred = q.defer();
        usermodel
            .findOne({_id: userId}, function (err, user) {
                user.books_liked.push(bookId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function addtowishlist(userId, bookId) {
        var deferred = q.defer();
        usermodel
            .findOne({_id: userId}, function (err, user) {
                user.books_wished.push(bookId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function removefromwishlist(userId, bookId) {
        var deferred = q.defer();
        usermodel
            .findOne({_id: userId}, function (err, user) {
                var index = user.books_wished.indexOf(bookId);
                user.books_wished.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function undolike(userId, bookId) {
        var deferred = q.defer();
        usermodel
            .findOne({_id: userId}, function (err, user) {
                var index = user.books_liked.indexOf(bookId);
                user.books_liked.splice(index, 1);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        var deferred = q.defer();
        usermodel
            .update({_id: userId},
                {$set: newUser})
            .then(function (user, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        usermodel
            .find()
            .then(function (users, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function deleteUser(uid) {
        var deferred = q.defer();
        usermodel
            .remove({_id: uid}, function (err, user) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function addToBannedList(aid,uid) {
        var deferred = q.defer();
        usermodel
            .findOne({_id: aid}, function (err, user) {
                user.banned_list.push(uid);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

};