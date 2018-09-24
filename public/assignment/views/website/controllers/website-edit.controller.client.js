(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (website) {
                    vm.website = website;
                });
        }

        init();

        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .then(function (websites) {
                    vm.message = "Website successfully updated!"
                })
        }

        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .then(function (website) {
                    $location.url("/user/" + vm.userId + "/website");
                })
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (website) {
                    $location.url("/user/" + vm.userId + "/website");
                })
        }}
    })();
