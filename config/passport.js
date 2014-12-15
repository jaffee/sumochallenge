
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport) {

	// donothing serialization
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

	// donothing deserialization
    passport.deserializeUser(function(id, done) {
		done(null, id);
    });

	// hardcoded admin login
	passport.use(new LocalStrategy(
		function(username, password, done) {
			if(username == "admin" && password == "mypass"){
				return done(null, "admin");
			}
			else {
				// message not currently used
				return done(null, false, { message: 'bad credentials'});
			}
		}
	));

};
