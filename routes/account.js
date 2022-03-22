const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/db');


router.post('/reg', (req, res) => {
  User.getUserByEmail(req.body.email, (err, user) => {
    if (user) {
      res.json({ success: false, msg: 'You already have an account' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({ success: false, msg: 'Something went wrong, try again later..' });
        } else {
          res.json({ success: true, msg: 'You have successfully been registered' });
        }
      });
    }
  })
});

router.post('/auth', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found, please check your email' });
    } else {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 3600 * 24 });
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              email: user.email
            },
            msg: 'You have successfully been logged in'
          });
        } else {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      });
    }
  });
});

module.exports = router;