module.exports = function (app) {
    var model = require('./model/models.server')(app);
    require('./services/user.service.server.js')(app, model);
    require('./services/library.service.server.js')(app, model);
    require('./services/book.service.server.js')(app, model);
    require('./services/bookrequests.service.server')(app, model);
    require('./services/bookrental.service.server')(app, model);

};