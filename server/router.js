var index = require('./controllers/index'),
    db = require('./controllers/db'),
    auth = require('./controllers/auth'),
    passport = require('./lib/passport');

module.exports = function (app) {

    app.get('/', index.index);
    app.post('/users/*/tweets', db.postUserTweet);
    app.get('/users/*/tweets', db.getUserTweets);
    app.get('/users', db.getUsers);
    app.get('/auth/', passport.authenticate('yandex'), auth.auth);
    app.get('/auth/yandex/callback', passport.authenticate('yandex', { failureRedirect: '/login' }), auth.callback);

    app.get('*', function (req, res) {
        res.send(404);
    });
};