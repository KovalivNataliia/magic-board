const express = require('express');
const router = express.Router({mergeParams: true});
const List = require('../models/list');
const passport = require('passport');


router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userId = req.query.userId;
  List.getUsersLists(userId, (err, lists) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, lists: lists });
    }
  })
});

router.post('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newList = new List({
    title: req.body.title,
    userId: req.body.userId
  });

  List.addList(newList, (err, list) => {
    if (err) {
      res.json({ success: false, msg: 'Something went wrong, try again later..' });
    } else {
      res.json({ success: true, msg: 'You have successfully added new list' });
    }
  });
});

module.exports = router;