(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "updateWebsite": updateWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(newWebsiteId ,newWebsite) {
            return $http.put("/api/website/"+newWebsiteId,newWebsite)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsite(userId,website) {
            return $http.post("/api/user/"+userId+"/website",website)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website")
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();