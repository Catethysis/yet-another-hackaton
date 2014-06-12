var MongoClient = require('mongodb').MongoClient;
var vow = require('vow');
var db_tweets, db_users, users;

MongoClient.connect('mongodb://admin:pwd@localhost:27017/twi', function(err, db) {
	if(err) throw err;
	console.log("Connected to DB");
	db_users = db.collection('users');
	//db_users.find({id: 1}).toArray(function(err, res) { users=res; });
	db_tweets = db.collection('tweets');
});

module.exports = {
	upsertUser: function(id, profile, clb) {
		db_users.update({id: id}, {$set: {profile: profile}}, {upsert: true}, clb);
	},
	getUser: function(id, clb) {
		db_users.findOne({id: id}, clb);
	}
}