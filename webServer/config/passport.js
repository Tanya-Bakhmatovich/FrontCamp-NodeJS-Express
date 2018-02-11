const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/users');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
(username, password, done) => {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, () => {
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  });
}
));

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
User.findById(id, function(err,user){
  err
    ? done(err)
    : done(null,user);
});
});
  module.exports = passport;
