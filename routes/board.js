const express = require('express');
const router = express.Router({ mergeParams: true });
const List = require('../models/list');
const Card = require('../models/card');
const passport = require('passport');


router.get('/lists', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userId = req.query.userId;
  List.getUsersLists(userId, (err, lists) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, lists: lists });
    }
  })
});

router.post('/lists', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newList = new List({
    title: req.body.title,
    userId: req.body.userId
  });

  List.addList(newList, (err, list) => {
    if (err) {
      res.json({ success: false, msg: 'Something went wrong, try again later..' });
    } else {
      res.json({ success: true, msg: 'You have successfully added new list', list });
    }
  });
});

router.patch('/lists/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const id = req.params.id;

  List.getListById(id, (err, list) => {
    List.changeList(list, req.body, (err, list) => {
      if (err) {
        res.json({ success: false, msg: 'Something went wrong, try again later..' });
      } else {
        res.json({ success: true, msg: 'You have successfully changed list' });
      }
    })
  })
});

router.delete('/lists/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const id = req.params.id;
  List.deleteList(id, (err, list) => {
    if (err) {
      res.json({ success: false, msg: 'Something went wrong, try again later..' });
    } else {
      res.json({ success: true, msg: 'You have successfully deleted list' });
    }
  })
});

router.post('/lists/:id/cards', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newCard = new Card({
    text: req.body.text,
    color: req.body.color
  });

  const id = req.params.id;

  List.getListById(id, (err, list) => {
    Card.addCard(newCard, list, (err, result) => {
      if (err) {
        res.json({ success: false, msg: 'Something went wrong, try again later..' });
      } else {
        res.json({ success: true, msg: 'You have successfully added new card', newCard });
      }
    });
  })
});

module.exports = router;