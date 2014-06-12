var express = require('express'),
    app = express(),
    db = require('./controllers/db'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    auth = require('./controllers/auth');

var passport = auth.passport;

module.exports = function(sock) {

    //logger
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });
    // app.use(express.static('public'));
    app.use(require('cookie-parser')());
    // app.use(express.bodyParser());
    app.use(session({
        secret: 'twi',
        proxy: true,
        store: new MongoStore({
            db: 'twi',
            url: 'mongodb://admin:pwd@localhost:27017/twi/sessions'
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', function(req, res) {
        if(!!req.user) {
            page='Привет, ' + (req.user && req.user.username) + '!<br><br>';
            page+='<a href="/get?user='+/*req.user.id+*/'">Мои твиты</a><br>';
            page+='<a href="/users">Пользователи</a>';
            page+='<form action="/post"><input type="text" name="tweet" maxlength=140><br><input type="submit"></form>'
        }
        else {
            page='Пожалуйста, войдите в свой <a href="">Яндекс&ndash;аккаунт</a>.<br><br>';
            page+='<a href="/users">Пользователи</a>';
        }
        res.send(page);
    });

    app.get('/get', db.getTweets);
    app.get('/post', db.postTweet);
    app.get('/users', db.getUsers);

    app.get('/auth/', passport.authenticate('yandex'), auth.auth);
    app.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), auth.callback);

    app.listen(sock);
    console.log('start listening socket: ', sock);

}
