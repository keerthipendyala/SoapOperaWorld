module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var showSchema = require('./show.schema.server.js')();
    var showModel = mongoose.model('showModel', showSchema);

    var api = {
        addSeller: addSeller,
        createShow: createShow,
        addTVSeller: addTVSeller,
        updateShow: updateShow,
        findShowByShowId: findShowByShowId,
        removeSeller: removeSeller,
        liketheshow: liketheshow,
        undolike: undolike,
        updateTradeShow:updateTradeShow,
        deleteShow:deleteShow
    };
    return api;


    function addSeller(showId, sellerId) {
        var deferred = q.defer();
        showModel
            .findOne({showId: showId}, function (err, show) {
                show.sellers.push(sellerId);
                show.save();
                deferred.resolve(show);
            });
        return deferred.promise;
    }

    function liketheshow(showId, sellerId) {
        var newShow = {users_liked: [sellerId], showId: showId};
        var deferred = q.defer();
        showModel
            .findOne({showId: showId}, function (err, show) {
                if (!show) {
                    showModel
                        .create(newShow, function (err, show) {
                            if (err) {
                                deferred.abort(err);
                            } else {
                                deferred.resolve(show);
                            }
                        });
                }
                else {
                    show.users_liked.push(sellerId);
                    show.save();
                    deferred.resolve(show);
                }

            });
        return deferred.promise;
    }


    function undolike(showId, userId) {
        var deferred = q.defer();
        showModel
            .findOne({showId: showId}, function (err, show) {
                var userindex = show.users_liked.indexOf(userId);
                show.users_liked.splice(userindex, 1);
                show.save();
                deferred.resolve(show);
            });
        return deferred.promise;
    }

    function removeSeller(sellerId, showId) {
        var deferred = q.defer();
        showModel
            .findOne({showId: showId}, function (err, show) {
                var sellerindex = show.sellers.indexOf(sellerId);
                show.sellers.splice(sellerindex, 1);
                show.save();
                deferred.resolve(show);
            });
        return deferred.promise;
    }


    function addComments(showId, usercomments) {
        var deferred = q.defer();
        showModel
            .findOne({showId: showId}, function (err, show) {
                show.comments.push(usercomments);
                show.save();
                deferred.resolve(show);
            });
        return deferred.promise;
    }

    function createShow(show) {
        var deferred = q.defer();
        showModel
            .create(show, function (err, user) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findSellerByShowId(showId) {
        var deferred = q.defer();
        showModel
            .findOne({showId: showId})
            .then(function (show, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(show);
            });
        return deferred.promise;
    }


    function updateTradeShow(showId, newShow, tradeId) {
        var deferred = q.defer();
        newShow.trades.push(tradeId);
        showModel
            .update({showId: showId},
                {$set: newShow})
            .then(function (user, err) {
                if (err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updateShow(showId, newShow, transferId) {
        var deferred = q.defer();
        showModel
            .update({showId: showId},
                {$set: newShow})
            .then(function (user, err) {
                if (err) {
                    deferred.abort(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function deleteShow(showId) {
        var deferred = q.defer();
        showmodel
            .remove({_id: showId}, function (err, show) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(show);
                }
            });
        return deferred.promise;
    }

    function findShowByShowId(showId) {
        var deferred = q.defer();
        showModel
            .findOne({showId: showId})
            .then(function (show, err) {
                if (err)
                    deferred.abort(err);
                else
                    deferred.resolve(show);
            });
        return deferred.promise;
    }

    function addTVSeller(sellerId, showId, nshow) {
        var deferred = q.defer();
        var exists = false;
        showModel
            .findOne({showId: showId})
            .then(function (show, err) {
                if (err)
                    deferred.abort(err);
                else {
                    if (!show) {
                        //When the show is not present in the table, create show and add the seller
                        var ns = {showId: showId, count: nshow.count, sellers: [sellerId]};
                        showModel
                            .create(ns, function (err, show) {
                                if (err) {
                                    deferred.abort(err);
                                } else {
                                    deferred.resolve(show);
                                }
                            });
                    }
                    else {

                        //when show exists update total show count
                        show.count += nshow.count;
                        for (var i = 0; i < show.sellers.length; i++) {
                            if (show.sellers[i] === sellerId) {
                                exists = true;
                            }
                        }
                        if (exists === false) {
                            show.sellers.push(sellerId);
                        }
                        show.save();
                        deferred.resolve(show);
                    }
                }
            });
        return deferred.promise;
    }
};