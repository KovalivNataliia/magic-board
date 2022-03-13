const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

// router.get('/reg', (req, res) => {
//   res.send('Registration');
// });

router.post('/reg', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'User has not been added' });
    } else {
      res.json({ success: true, msg: 'User has been added' });
    }
  });
});

router.post('/auth', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    } else {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          const token = jwt.sign(user, config.secret, { expiresIn: 3600 * 24 });
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              email: user.email
            }
          });
        } else {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      });
    }
  });
});

router.get('/board', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Magic-board');
});

module.exports = router;