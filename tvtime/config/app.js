module.exports = function(app)
{
    //for local
    // var connectionString = 'mongodb://127.0.0.1:27017/kpendyala';

    //using mlab

       var connectionString = "mongodb://heroku_t9m02xj9:3ggo3a6k78dirc1ma35bgqb238@ds117821.mlab.com:17821/heroku_t9m02xj9"

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
};