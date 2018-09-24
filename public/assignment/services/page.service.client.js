(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function findPageByWebsiteId(wid) {
            return $http.get("/api/website/"+wid+"/page")
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pid) {
            return $http.get("/api/page/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId,Newpage) {
            return $http.put("/api/page/"+pageId,Newpage)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page",page)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();