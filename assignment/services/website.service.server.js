    module.exports = function (app,model) {
        app.post('/api/user/:userId/website', createWebsiteForUser);
        app.get('/api/user/:userId/website', findAllWebsitesForUser);
        app.get('/api/website/:websiteId', findWebsiteById);
        app.put('/api/website/:websiteId', updateWebsite);
        app.delete('/api/website/:websiteId', deleteWebsite);

        function findAllWebsitesForUser(req, res) {
            var userId = req.params.userId;
            model.websiteModel
                .findAllWebsitesForUser(userId)
                .then(function (websites) {
                    res.send(websites);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function deleteWebsite(req, res) {
            model.websiteModel
                .deleteWebsite(req.params.websiteId)
                .then(function (website) {
                    res.send(website);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function findWebsiteById(req, res) {
            var websiteId = req.params['websiteId'];
            model.websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    res.send(website);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function createWebsiteForUser(req, res) {
            var userId = req.params.userId;
            var newWebsite = req.body;
            model.websiteModel
                .createWebsiteForUser(userId, newWebsite)
                .then(function (Website) {
                    model.userModel
                        .addWebsite(userId,Website._id)
                        .then(function(user){
                            res.send(Website);})
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

        function updateWebsite(req, res) {
            var newWebsite = req.body;
            var newWebsiteId = req.params.websiteId;
            model.websiteModel
                .updateWebsite(newWebsiteId, newWebsite)
                .then(function (newWebsite) {
                    res.send(newWebsite);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    };

