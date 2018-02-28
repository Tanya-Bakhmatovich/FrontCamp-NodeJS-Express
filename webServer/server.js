const express = require('express');
const router = require('./blogRouter');
const users = require('./userRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const messages = require('express-messages');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');

mongoose.connect(config.database);
const db = mongoose.connection;

db.on('error', () => console.log('connection failed'));
db.once('open', () => console.log('Connected to dbBlogs'))

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(validator());

// Express session Middleware
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

// Express messages Middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = require('express-messages')(req, res);
  next();
});

// Passport config
app.use(passport.initialize());
app.use(passport.session());

const checkAuth = (req, resp, next) => {
  return req.isAuthenticated() ? next() : resp.redirect('/users');
}

app.get('/blogs', checkAuth, (req, res) => {
  res.render('blogs', { title: 'Blogs', message: 'Blogs', user: req.user.username });
});

app.use('/blogs', router);
app.use('/users', users);

app.use((req, resp) => {
  resp.render('index', { title: 'Welcome page', message: 'WELCOME!' })}
);

app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

app.listen(3000, () => console.log('Listening on port 3000'));
