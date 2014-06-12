var mongoose = require('mongoose');

db = mongoose.createConnection('mongodb://admin:pwd@localhost:27017/twi');
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected to DB")
});

var TweetSchema = new mongoose.Schema( {
    text: { type: String, default: "tweet" },
    user: { type: Number }
} );

var UserSchema = new mongoose.Schema( {
    text: { type: String, default: "tweet" },
    user: { type: Number }
} );

var par;

module.exports = {

    get: function(req, res) {
    	
        res.send('get par='+par);

    },


    post: function(req, res) {
    	par=req.query.s;
        res.send('set par='+par)

    }


}
