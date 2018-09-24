    module.exports = function (app,model) {
        app.post('/api/website/:websiteId/page', createPage);
        app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
        app.get('/api/page/:pageId', findPageById);
        app.put('/api/page/:pageId', updatePage);
        app.delete('/api/page/:pageId', deletePage);


        /*var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "123", "name": "Post 11", "websiteId": "123", "description": "Lorem"},
            {"_id": "456", "name": "Post 22", "websiteId": "234", "description": "Lorem"},
            {"_id": "789", "name": "Post 33", "websiteId": "567", "description": "Lorem"}
        ];*/

        function findAllPagesForWebsite(req, res) {
            var websiteId = req.params.websiteId;
            model.pageModel
                .findAllPagesForWebsite(websiteId)
                .then(function (pages) {
                    res.send(pages);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function deletePage(req, res) {
            model.pageModel
                .deletePage(req.params.pageId)
                .then(function (page) {
                    res.send(page);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function findPageById(req, res) {
            var pageId = req.params['pageId'];
            model.pageModel
                .findPageById(pageId)
                .then(function (page) {
                    res.send(page);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function createPage(req, res) {
            var websiteId = req.params.websiteId;
            var page = req.body;
            model.pageModel
                .createPage(websiteId, page)
                .then(function (newpage) {
                    model.websiteModel
                        .addPage(websiteId,newpage._id)
                        .then(function(status){
                            res.send(newpage);})
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function updatePage(req,res) {
            var newPage = req.body;
            var newPageId = req.params.pageId;
            model.pageModel
                .updatePage(newPageId, newPage)
                .then(function (Page) {
                    res.send(Page);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    };

