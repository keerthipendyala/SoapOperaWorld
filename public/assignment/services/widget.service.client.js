(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        this.findAllWidgetsForPage=findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.reorderWidget = reorderWidget;
        this.createWidget=createWidget;
        this.reorderWidget=reorderWidget;


        function reorderWidget(index1,index2,pageId) {
            return $http.put("/page/"+pageId+"/widget?start="+index1+"&end="+index2)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget")
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(NewpageId,Newwidget) {
            return $http.post("/api/page/"+NewpageId+"/widget",Newwidget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widgetId,newWidget) {
            return $http.put("/api/widget/"+widgetId,newWidget)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();