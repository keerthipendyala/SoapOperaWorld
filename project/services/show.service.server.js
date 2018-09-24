module.exports = function (app, model) {
    app.get("/api/show/:showId", findShowByShowId);
    app.put("/api/show/:showId", updateShow);
    app.post("/api/show/:sellerId/:showId", addSeller);
    app.put("/api/show/purchase/:buyerId/:sellerId/:showId", purchaseTVShow);
    app.post("/api/show", createShow);
    app.delete("/api/deleteShow/:showId", deleteShow);
    app.get("/api/show/getsellers/:showId", getSellers);
    app.delete("/api/seller/:sellerId/:showId", removeSeller);

    function findShowByShowId(req, res) {
        var showId = req.params['showId'];
        model.showmodel
            .findShowByShowId(showId)
            .then(function (show) {
                res.send(show);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function addSeller(req, res) {
        var sellerId = req.params.sellerId;
        var showId = req.params.showId;
        // var seller = req.body;
        model.showmodel
            .addSeller(showId, sellerId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function getSellers(req, res) {
        var showId = req.params['showId'];
        model.showmodel
            .findShowByShowId(showId)
            .then(function (show) {
                res.send(show.sellers);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createShow(req, res) {
        model.showmodel
            .createShow(req.body)
            .then(function (show) {
                res.send(show);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteShow(req, res) {
        model.showmodel
            .deleteShow(req.params.showId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function removeSeller(req, res) {
        model.showmodel
            .removeSeller(req.params.sellerId, req.params.showId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function updateShow(req, res) {
        var showId = req.params['showId'];
        var newShow = req.body;
        model.showmodel
            .updateShow(showId, newShow)
            .then(function (show) {
                res.send(show);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function purchaseTVShow(req, res) {
        var showId = req.params['showId'];
        var sellerId = req.params['sellerId'];
        var buyerId = req.params['buyerId'];
        var cshow = req.body;
        model.usermodel
            .findUserByUserId(sellerId)
            .then(function (seller) {
                var showlist = seller.shows_forsale;
                for (var i = 0; i < showlist.length; i++) {
                    if (showlist[i].showId === showId) {
                        var newseller = seller;
                        newseller.shows_forsale[i].count -= 1;

                        //checking for outofstock on multiple buys at same time
                        if (newseller.shows_forsale[i].count === -1) {

                            //when out of stock , remove seller from show table
                            model.showmodel
                                .removeSeller(sellerId, showId)
                                .then(function (seller) {
                                    var outofstock = true;
                                    res.send(outofstock);
                                }, function (err) {
                                    res.sendStatus(500).send(err);
                                });
                        }
                        else {
                            //when in stock , update the seller by decrementing count
                            model.usermodel
                                .updateUser(sellerId, newseller)
                                .then(function (usr) {
                                    model.trademodel
                                        .createTransfer(sellerId, buyerId, showId)
                                        .then(function (transfer) {
                                            var newshow = cshow;
                                            newshow.count -= 1;
                                            //update the show table by decrementing overall count
                                            model.showmodel
                                                .updateTradeShow(showId, newshow, transfer._id)
                                                .then(function (show) {
                                                    var nshow = {showId: showId, count: 1};
                                                    //update the buyer by incrementing count
                                                    model.usermodel
                                                        .purchaseTVShow(buyerId, nshow)
                                                        .then(function (usr) {
                                                            res.send(usr);
                                                        }, function (err) {
                                                            res.sendStatus(500).send(err);
                                                        });
                                                }, function (err) {
                                                    res.sendStatus(500).send(err);
                                                });
                                        }, function (err) {
                                            res.sendStatus(500).send(err);
                                        });
                                }, function (err) {
                                    res.sendStatus(500).send(err);
                                });
                        }
                    }
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};