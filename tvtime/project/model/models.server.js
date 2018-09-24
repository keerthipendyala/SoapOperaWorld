module.exports = function () {
    var usermodel = require('../model/user/user.model.server')();
    var librarymodel = require('../model/library/library.model.server')();
    var bookmodel = require('../model/book/book.model.server')();
    var bookrequestsmodel = require('../model/bookrequests/bookrequests.model.server')();
    var bookrentalsmodel = require('../model/bookrentals/bookrentals.model.server')();

    var model = {
        usermodel: usermodel,
        librarymodel: librarymodel,
        bookmodel: bookmodel,
        bookrequestsmodel: bookrequestsmodel,
        bookrentalsmodel:bookrentalsmodel
    };
    return model;
};