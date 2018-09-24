module.exports = function () {
    var userModel = require('../model/user/user.model.server')();
    var websiteModel = require('../model/website/website.model.server')();
    var pageModel = require('../model/page/page.model.server')();
    var widgetModel = require('../model/widget/widget.model.server')();
    var model = {
        userModel: userModel,
        websiteModel:websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };
    return model;
};