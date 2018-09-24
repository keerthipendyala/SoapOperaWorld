(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .then(function(widgets){
                    vm.widgets =widgets;
                });
        }

        init();

        function createWidget(widgetType) {
            var newWidget = {};
            newWidget.type =widgetType;
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .then(function(widget){
                    vm.widget=widget;
                   $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                 });
        }
    }
})();
