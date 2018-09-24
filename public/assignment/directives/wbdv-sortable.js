(function () {
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable', sortableDir);
    function sortableDir($routeParams){
        var pageId = $routeParams.pid;
        function linking(scope, element,attr) {
            var start = -1;
            var end = -1;
            element.sortable(
                {axis: 'y'},
                {start: function (event, ui) {
                    start = (ui.item).index();
                },
                    stop: function(event, ui){
                    end = (ui.item).index();
                    scope
                        .sortableController.reorderWidget(start,end ,pageId);
                }});
        }
        return {
            scope:{},
            link: linking,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.reorderWidget = reorderWidget;
        function reorderWidget(start, end, pageId) {
            WidgetService
                .reorderWidget(start, end, pageId);
        }
    }

})();