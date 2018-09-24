module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();

    var userModel = mongoose.model('userModel', userSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        addWebsite:addWebsite,
        findUserByUserId:findUserByUserId
    };
    return api;


    function createUser(newUser) {
        var deffered = q.defer();
        userModel
            .create(newUser, function (err, user) {
                if(err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(user);
                }
            });
        return deffered.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel
            .remove({_id: userId}, function (err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId,newUser) {
        var deferred = q.defer();
        userModel.update(
            {
                _id:userId
            },
            {
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                username:newUser.username,
                email : newUser.email,
                phone : newUser.phone
            })
            .then(function (user, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUserId(userId) {
        var deferred = q.defer();
        userModel
            .findById({_id:userId})
            .then(function (user, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel
            .findOne({username:username})
            .then(function (user, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        userModel
            .findOne({username:username,password:password})
            .then(function (user, err) {
                    if(err)
                        deferred.abort(err);
                    else
                        deferred.resolve(user);
                });
        return deferred.promise;
    }

    function addWebsite(userId, websiteId) {
        var deferred = q.defer();
        userModel
            .findById({_id:userId}, function (err, user) {
                user.websites.push(websiteId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;
    }

};