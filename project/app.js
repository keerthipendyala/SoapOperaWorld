module.exports = function (app) {
    var model = require('./model/models.server')(app);
    /*  var userModel = require('./model/user/user.model.server')();
     var websiteModel = require('./model/website/website.model.server')();
     var pageModel = require('./model/page/page.model.server')();
     var widgetModel = require('./model/widget/widget.model.server')();
     var model = {
     userModel: userModel,
     websiteModel:websiteModel,
     pageModel:pageModel,
     widgetModel:widgetModel
     };
     */
   require('./services/user.service.server.js')(app,model);
    require('./services/show.service.server.js')(app,model);
    require('./services/trade.service.server.js')(app,model);

};