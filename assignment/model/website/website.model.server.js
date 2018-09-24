module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server')();

    var websiteModel = mongoose.model('websiteModel', websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite:updateWebsite,
        addPage:addPage,
        deleteWebsite:deleteWebsite
    };
    return api;


    function createWebsiteForUser(userId, newWebsite) {
        var deffered = q.defer();
        newWebsite._user=userId;
        websiteModel
            .create(newWebsite, function (err, newWebsite) {
                if(err) {
                    deffered.abort(err);
                } else {
                    deffered.resolve(newWebsite);
                }
            });
        return deffered.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel
            .remove({_id: websiteId}, function (err, website) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId,newWebsite) {
        var deferred = q.defer();
        websiteModel.update(
            {
                _id:websiteId
            },
            {
                name : newWebsite.name,
                description : newWebsite.description,
                _user:newWebsite._user,
                pages:newWebsite.pages,
                dateCreated:newWebsite.dateCreated
            })
            .then(function (website, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .find({_user:userId})
            .then(function (websites, err) {
                if(err)
                    deferred.abort(err);
                else
                    deferred.resolve(websites);
            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById({_id:websiteId})
            .then(function (website, err) {
                if(err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function addPage(websiteId, pageId) {
        var deferred = q.defer();
        websiteModel
            .findById({_id:websiteId}, function (err, website) {
                website.pages.push(pageId);
                website.save();
                deferred.resolve(website);
            });
        return deferred.promise;
    }
};