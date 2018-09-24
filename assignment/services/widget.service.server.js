        module.exports = function (app,model) {
            app.get('/api/widget/:widgetId', findWidgetById);
            app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
            app.put('/api/widget/:widgetId', updateWidget);
            app.put('/page/:pageId/widget', reorderWidget);
            app.delete('/api/widget/:widgetId', deleteWidget);
            app.post('/api/page/:pageId/widget', createWidget);
            app.put('/page/:pageId/widget', reorderWidget);


           /* var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ]*/

            var multer = require('multer');
            var upload = multer({ dest: __dirname+'/../../public/uploads' });
            app.post ("/api/upload", upload.single('myFile'), uploadImage);

            function uploadImage(req, res) {
                var myFile = req.file;
                var filename = myFile.filename;
                var widget={};
                widget.url =  req.protocol + '://' + req.get('host') + "/uploads/" + filename;
                widget.type = "IMAGE";
                widget._id = req.body.widgetId;
                widget.width =req.body.width;
                model
                    .widgetModel
                    .updateWidget(widget._id,widget)
                    .then(function (widget){
                       res.redirect("/assignment/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                    }, function(err){
                    res.sendStatus(500).send(err);
                });
            }

            function findAllWidgetsForPage(req, res) {
                var pageId = req.params.pageId;
                model.widgetModel
                    .findAllWidgetsForPage(pageId)
                    .then(function (widgets) {
                        res.send(widgets);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }

            function deleteWidget(req, res) {
                model.widgetModel
                    .deleteWidget(req.params.widgetId)
                    .then(function (widget) {
                        res.send(widget);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }

            function findWidgetById(req,res) {
                var widgetId = req.params['widgetId'];
                model.widgetModel
                    .findWidgetById(widgetId)
                    .then(function (widget) {
                        res.send(widget);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }

            function createWidget(req, res) {
                var pageId = req.params.pageId;
                var newWidget = req.body;

                model.widgetModel
                    .createWidget(pageId, newWidget)
                    .then(function (Widget) {
                        model.pageModel
                            .addWidget(pageId, Widget._id)
                            .then(function (page) {
                                res.send(Widget);
                            })
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }

            function updateWidget(req,res) {
                var newWidget = req.body;
                var newWidgetId = req.params.widgetId;
                model.widgetModel
                    .updateWidget(newWidgetId, newWidget)
                    .then(function (Widget) {
                        res.send(Widget);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }

            function reorderWidget(req,res) {
                var pageId = req.params['pageId'];
                var start = parseInt(req.query.start);
                var end = parseInt(req.query.end);
                model.widgetModel
                     .reorderWidget(start,end,pageId)
                    .then(function (widgets) {
                        res.send(widgets);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }
        };


