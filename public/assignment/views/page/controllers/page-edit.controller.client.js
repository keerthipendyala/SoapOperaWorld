(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (pages) {
                   vm.pages = pages;
            });
            PageService
                .findPageById(vm.pageId)
                .then(function (page) {
                vm.page = page;
            });
        }
        init();

        function updatePage(newPage) {
           PageService
               .updatePage(vm.pageId, newPage)
               .then(function (pageone) {
                if (pageone == null) {
                    vm.error = "unable to update page";
                }
                else {
                    vm.message = "Page successfully updated!"
                }
            });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function(page)
                {
                   $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }
})();
