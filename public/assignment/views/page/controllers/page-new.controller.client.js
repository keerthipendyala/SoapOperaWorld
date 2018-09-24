(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        PageService
            .findPageByWebsiteId(vm.websiteId)
            .then(function (pages) {
            vm.pages = pages;
        });

        function createPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .then(function (pge) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });
        }
    }
})();
