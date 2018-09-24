(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService,WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId=$routeParams.wgid;
        vm.searchPhoto = searchPhoto;
        vm.selectPhoto = selectPhoto;

        function searchPhoto(searchTerm) {
            FlickrService
                .searchPhoto(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var newWidget={};
            newWidget.url = url;
            newWidget.type = "IMAGE";
            newWidget._page=vm.pageId;
            WidgetService
                .updateWidget(vm.widgetId,newWidget)
                .then(function(widget){
                   $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            });
        }


    }
})();