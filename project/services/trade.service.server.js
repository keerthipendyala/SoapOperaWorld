module.exports = function (app, model) {
    app.post("/api/newtrade", createNewTrade);
    app.get("/api/buyertrade/:buyerId", findTradeByBuyerId);
    app.get("/api/sellertrade/:sellerId", findTradeBySellerId);
    app.put("/api/updatetrade", updateTrade);
    app.get("/api/trades", findAllTrades);
    app.delete("/api/trade/:tradeId", deleteTrade);

    function findTradeByBuyerId(req, res) {
        var buyerId = req.params['buyerId'];
        model.trademodel
            .findTradeByBuyerId(buyerId)
            .then(function (transfer) {
                res.send(transfer);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findTradeBySellerId(req, res) {
        var sellerId = req.params['sellerId'];
        model.trademodel
            .findTradeBySellerId(sellerId)
            .then(function (transfer) {
                res.send(transfer);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateTrade(tradeId, newtrade) {
        var deferred = q.defer();
        model.trademodel
            .update({_id: tradeId},
                {$set: newtrade})
            .then(function (trade, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(trade);
                }
            });
        return deferred.promise;
    }

    function findAllTrades(req, res) {
        model.trademodel
            .findAllTrades()
            .then(function (transfer) {
                res.send(transfer);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteTrade(req, res) {
        model.trademodel
            .deleteShow(req.params.showId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createNewTrade(sellerId, buyerId, showId) {
        var deferred = q.defer();
        var transfer = {sellerId: sellerId, buyerId: buyerId, showId: showId};
        model.trademodel
            .create(transfer, function (err, user) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

};