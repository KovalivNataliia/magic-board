const express = require('express');
const router = express.Router()

router.get('/reg', (req, res) => {
  res.send('Registration');
});

router.get('/auth', (req, res) => {
  res.send('Authorization');
});

router.get('/board', (req, res) => {
  res.send('Magic-board');
});

module.exports = router;