(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.UserId = $routeParams.uid;
        PageService
            .findPageByWebsiteId(vm.websiteId)
            .then(function (pges) {
            vm.pages = pges;
        });
    }
})();