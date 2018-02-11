const express = require('express');
const users = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('./models/users');

users.get('/', (req, resp) =>
  resp.render('users')
);

//Register Form
users.get('/register', (req, resp) =>
  resp.render('register', {title: 'Register', message: 'Please, register'}));

// Register process
users.post('/', (req, resp, next) => {
      const { username, name, email, password  } = req.body;
      const newUser = new User({
        username,
        name,
        email,
        password,
      });

      req.checkBody('username', 'Username is required').notEmpty();
      req.checkBody('name', 'Name is required').notEmpty();
      req.checkBody('email', 'Email is required').notEmpty();
      req.checkBody('password', 'Password is required').notEmpty();

      const errors = req.validationErrors();

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>
          err ? console.log(err) : newUser.password = hash);
      newUser.save()
        .then(() => {
          resp.redirect('/users/login');
          req.flash('success', 'You are registered and now can log in');
        })
        .catch(() =>
          resp.render('register',
          {title: 'Register', message: 'Something went wrong, check your data and try more', errors})
        );
    });
});

//Login
users.get('/login', (req, resp) =>
  resp.render('login', { title: 'Login', message: 'Please, log in', errors: req.flash('error') }));

// Login Process
users.post('/login',
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
);

module.exports = users;
