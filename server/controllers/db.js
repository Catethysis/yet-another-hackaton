var db = require('../lib/db');

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
        db.postTweet(req.query.tweet, 22908491);
        res.redirect('/');
    	/*par=req.query.s;
        res.send('set par='+par)*/
        //db.postTweet('Hello2', req.query.user.split('/')[0]);
    }
};