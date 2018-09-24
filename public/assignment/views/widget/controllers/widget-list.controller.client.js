(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.reorderWidget = reorderWidget;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;


        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .then(function(widgets){
                   vm.widgets = widgets.sort(compareWidgets);
                });
        }
        init();


        function compareWidgets(widgetone,widgettwo) {
           if (widgetone.order < widgettwo.order)
               return -1;
            if (widgetone.order > widgettwo.order)
                return 1;
            return 0;
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-' + widgetType + '.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function reorderWidget(start,end) {
            WidgetService
                .reorderWidget(start,end,vm.pageId)
                .then(function(widgets){
                    return widgets;
                });
        }
    }
})();