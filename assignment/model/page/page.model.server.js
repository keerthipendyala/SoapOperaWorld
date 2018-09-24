module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server')();

    var pageModel = mongoose.model('pageModel', pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage:updatePage,
        addWidget:addWidget,
        deletePage:deletePage
    };
    return api;


    function createPage(websiteId, newPage) {
        var deffered = q.defer();
        newPage._website=websiteId;
        pageModel
            .create(newPage, function (err, newPage) {
                if(err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(newPage);
                }
            });
        return deffered.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel
            .remove({_id: pageId}, function (err, page) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function updatePage(pageId,newpage) {
        var deferred = q.defer();
        pageModel.update(
            {
                _id:pageId
            },
            {
                name : newpage.name,
                title : newpage.title,
                description : newpage.description,
                widgets:newpage.widgets,
                dateCreated:newpage.dateCreated
            })
            .then(function (page, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel
            .find({_website:websiteId})
            .then(function (pages, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(pages);
            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel
            .findById({_id:pageId})
            .then(function (page, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function addWidget(pageId, widgetId) {
        var deferred = q.defer();
        pageModel
            .findById({_id:pageId}, function (err, page) {
                page.widgets.push(widgetId);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;
    }
};