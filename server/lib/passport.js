var passport = require('passport');
var passportYandex = require('passport-yandex').Strategy;
var db = require('../lib/db');

passportYandex.prototype.authorizationParams = function() {
    return {
        state: process.env.SUDO_USER
    };
}

passport.use(new passportYandex({
        clientID: 'a55d6e3ea4d64578bb931fba21b84160',
        clientSecret: '49664a3c890d4d46b4bd5376375f5fde',
        callbackURL: "http://callback.twi.dev/"
    },
    function(accessToken, refreshToken, profile, done) {

        db.upsertUser(profile.id, profile, function(err, data) {
            done(err, profile);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    db.getUser(id, function(err, data) {
        if (data && data.profile) {
            done(null, data.profile)
        } else {
            done(err);
        }
    });
});

module.exports = passport;