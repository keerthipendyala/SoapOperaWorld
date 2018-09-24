(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {
        var api = {
            "searchPhoto": searchPhoto
        };
        return api;

        function searchPhoto(searchTerm) {
            var key = "43e9191c20c50ad43ca0cd65776c55f5";
            var secret = "77a1c82c86f545c5";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();