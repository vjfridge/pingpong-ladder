var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserializeUser');
    done(null, user);
});

console.log('GOOGLE_CLIENT_ID:'+process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:'+process.env.GOOGLE_CLIENT_SECRET);

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('in google strategy callback');
        var userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
        };
        done(null, userData);
    })
);