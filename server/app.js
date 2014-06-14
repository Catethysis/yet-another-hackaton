var express = require('express'),
    app = express(),
    path = require('path'),
    root = path.join(__dirname, '..'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    busboy = require('connect-busboy'),
    passport = require('./lib/passport');

module.exports = function(sock) {

    //logger
    app.use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    });
    app.use(express.static(path.join(root, 'static')));
    app.use(require('cookie-parser')());
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
    app.use(busboy());

    require('./middleware/express-bemView')(app, {
        templateRoot: path.join(root, 'static'),
        // параметры по умолчанию
        bundleName: 'desktop',
        availableBundles: ['desktop'],
        languageId: 'ru'
    });

    require('./router')(app);

    app.listen(sock);
    console.log('start listening socket: ', sock);
}
