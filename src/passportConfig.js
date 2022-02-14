const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models/User");

// Configure strategy

// Verify -> check if valid login by doing database lookup
function verify(username, password, done) {
  User.findOne({ username }, function (err, user) {
    // Exceptions
    if (err) {
      return done(err);
    }

    // No user with the specified username
    if (!user) {
      return done(null, false);
    }
    // Passwords do not match
    if (!user.comparePassword(password)) {
      return done(null, false);
    }

    // User is now verified
    return done(null, user);
  });
}

// serialize -> persist user data into session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize -> retrieve user data from session
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(verify));
