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
        }),
        cookie: { secure: true }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', function(req, res) {

        res.send('hello ' + (req.user && req.user.username));

    });

    app.get('/get/', db.get);
    app.get('/post/', db.post);

    app.get('/auth/', passport.authenticate('yandex'), auth.auth);
    app.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), auth.callback);

    app.listen(sock);
    console.log('start listening socket: ', sock);

}
