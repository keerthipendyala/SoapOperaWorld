(function(){
    angular
        .module("SoapOperaWorld")
        .factory('showService', showService);

    function showService($http) {

        var api = {
            "createShow": createShow,
            "deleteShow": deleteShow,
            "updateShow": updateShow,
            "findShowByShowId":findShowByShowId,
            "getTVShows":getTVShows,
            "getAllTVShows":getAllTVShows,
            "findProductById":findProductById,
            "getSellers":getSellers,
            "addSeller":addSeller,
            "deleteShow":deleteShow,
            "removeSeller":removeSeller,
            "purchaseTVShow":purchaseTVShow,
            "getTrailer":getTrailer,
            "getCredits":getCredits,
            "getSimilarShows":getSimilarShows,
            "getLatest":getLatest
        };
        return api;


        function createShow(Show) {
            return $http.post("/api/show", Show)
                .then(function (response) {
                    return response.data;
                });
        }


        function purchaseTVShow(buyerId,sellerId,showId,show) {
            return $http.put("/api/show/purchase/"+buyerId+"/"+sellerId+"/"+showId,show)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateShow(showId, newshow) {
            return $http.put("/api/show/"+showId, newshow)
                .then(function (response) {
                    return response.data;
                });
        }

        function addSeller(pid,sid) {
            return $http.post("/api/show/"+sid+"/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function getSellers(showId) {
            return $http.get("/api/show/getsellers/"+showId)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeSeller(sid,pid) {
            return $http.delete("/api/seller/"+sid+"/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteShow(pid) {
            return $http.delete("/api/seller/"+sid+"/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findShowByShowId(pid) {
            return $http.get("/api/show/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }


        function getTVShows(show) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var query = show.showname;
            var urlBase = "https://api.themoviedb.org/3/search/tv?api_key=API_KEY&language=en-US&query=TEXT&page=1";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", query);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getAllTVShows() {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var urlBase = "https://api.themoviedb.org/3/tv/popular?api_key=API_KEY&language=en-US&page=1";
            var url = urlBase.replace("API_KEY", key);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findProductById(pid) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var urlBase = "https://api.themoviedb.org/3/tv/TEXT?api_key=KEY&language=en-US";
            var url = urlBase.replace("KEY", key).replace("TEXT", pid);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTrailer(pid) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var urlBase = "https://api.themoviedb.org/3/tv/TEXT/videos?api_key=KEY&language=en-US";
            var url = urlBase.replace("KEY", key).replace("TEXT", pid);
            return $http.get(url)
                .then(function (response) {
                    return(response.data);
                });
        }

        function getCredits(pid) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var urlBase = "https://api.themoviedb.org/3/tv/TEXT/credits?api_key=KEY&language=en-US";
            var url = urlBase.replace("KEY", key).replace("TEXT", pid);
            return $http.get(url)
                .then(function (response) {
                    return(response.data);
                });
        }

        function getSimilarShows(pid) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var urlBase = "https://api.themoviedb.org/3/tv/TEXT/similar?api_key=KEY&language=en-US&page=1";
            var url = urlBase.replace("KEY", key).replace("TEXT", pid);
            return $http.get(url)
                .then(function (response) {
                    return(response.data);
                });
        }


        function getLatest() {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var urlBase = "https://api.themoviedb.org/3/tv/top_rated?api_key=KEY&language=en-US&page=1";
            var url = urlBase.replace("KEY", key);
            return $http.get(url)
                .then(function (response) {
                    return(response.data);
                });
        }
    }
})();