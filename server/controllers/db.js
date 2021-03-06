var db = require('../lib/db'),
    busboy = require('connect-busboy'),
    fs = require('fs'),
    uuid = require('node-uuid');

module.exports = {
    getUserTweets: function(req, res) {
        user_id=req.params[0];
        db.getUser(user_id, function(err, user)
        {
            page='<a href="/">Глагне</a><br><br>';
            page+=user.profile.displayName+' ('+user.profile.name.familyName+'&nbsp;'+user.profile.name.givenName+') написал:<br><ul>';
            db.getUserTweets(user_id, function(err, cursor) {
                cursor.toArray(function(err, arr) {
                    arr.forEach(function(item) {
                        page+='<li>'+item.content;
                        if(!!item.attach)
                            page+='<img src="http://static.twi.dev/'+item.attach+'">';
                        page+='</li>';
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
                    page+="<li><a href = /users/"+user.id+"/tweets/>"+user.profile.displayName+' &mdash; '+user.profile.name.familyName+'&nbsp;'+
                        user.profile.name.givenName+'</a></li><br>';
                });
                page+='</ul>'
                res.send(page);
            });
        });
    },

    postUserTweet: function(req, res) {
        var tweet={};
        req.pipe(req.busboy);
        req.busboy.on('field', function(key, value) {
            tweet.text=value;
            tweet.user=req.params[0];//req.user.id;
        });
        req.busboy.on('file', function (fieldname, file, filename) {
            extension=filename.split('.');
            extension=extension[extension.length-1];
            uid=uuid.v4()+'.'+extension; //имя файла в хранилище и для базы — UUID + расширение
            var fstream = fs.createWriteStream('static/' + uid);
            file.pipe(fstream);
            fstream.on('close', function () {
                tweet.attachUID=uid;
                console.log(tweet);
                db.postTweet(tweet);
            });
        });
        req.busboy.on('finish', function() {
            res.redirect('/');
        });
    }
};