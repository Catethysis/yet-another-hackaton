var db = require('../lib/db'),
    busboy = require('connect-busboy'),
    fs = require('fs'),
    uuid = require('node-uuid');

module.exports = {
    getTweets: function(req, res) {
        user_id=req.query.user.split('/')[0];
        db.getUser(user_id, function(err, user)
        {
            page='<a href="/">Глагне</a><br><br>';
            page+=user.profile.displayName+' ('+user.profile.name.familyName+'&nbsp;'+user.profile.name.givenName+') написал:<br><ul>';
            db.getUserTweets(user_id, function(err, cursor) {
                cursor.toArray(function(err, arr) {
                    arr.forEach(function(item) {
                        page+='<li>'+item.content+'</li>';
                    })
                    page+='</ul>';
                    res.send(page);
                })
            })
        });
    },

    getUsers: function(req, res) {
        db.getUsers(function(err, cursor)
        {
            cursor.toArray(function(err, arr) {
                page='<a href="/">Глагне</a><br><ul>';
                arr.forEach(function(user) {
                    page+="<li><a href = /get/?user="+user.id+">"+user.profile.displayName+' &mdash; '+user.profile.name.familyName+'&nbsp;'+
                        user.profile.name.givenName+'</a></li><br>';
                });
                page+='</ul>'
                res.send(page);
            });
        });
    },

    postTweet: function(req, res) {
        var tweet={};
        req.pipe(req.busboy);
        req.busboy.on('field', function(key, value) {
            tweet.text=value;
            tweet.user=req.user.id;
        });
        req.busboy.on('file', function (fieldname, file, filename) {
            extension=filename.split('.');
            extension=extension[extension.length-1];
            uid=uuid.v4()+'.'+extension; //имя файла в хранилище и для базы
            var fstream = fs.createWriteStream('upload/' + uid);
            file.pipe(fstream);
            fstream.on('close', function () {
                tweet.attachUID=uid;
            });
        });
        req.busboy.on('finish', function() {
            db.postTweet(tweet);
            res.redirect('/');
        });
    }
};