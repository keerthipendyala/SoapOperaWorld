(function(){
    angular
        .module("SoapOperaWorld")
        .factory('tradeService', tradeService);

    function tradeService($http) {

        var api = {
            "createNewTrade":createNewTrade,
            "findTradeByBuyerId":findTradeByBuyerId,
            "findTradeBySellerId":findTradeBySellerId,
            "findAllTrades":findAllTrades,
            "deleteTrade":deleteTrade,
            "updateTrade":updateTrade

        };
        return api;

        function findTradeByBuyerId(bid) {
            return $http.get("/api/buyertrade/"+bid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTradeBySellerId(sid) {
            return $http.get("/api/sellertrade/"+sid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTrades() {
            return $http.get("/api/trades")
                .then(function (response) {
                    return response.data;
                });
        }

        function createNewTrade(Trade) {
            return $http.post("/api/newtrade", Trade)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteTrade(tradeId) {
            return $http.delete('/api/user/' + tradeId)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateTrade(tradeId, newtrade) {
            return $http.put("/api/updatetrade/" + tradeId, newtrade)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();