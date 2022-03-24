const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const accountRoutes = require('./routes/account');
const boardRoutes = require('./routes/board');
const session = require('express-session');


const app = express();

// const PORT = 3000;
const PORT = process.env.PORT || 8080;

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: config.secret
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Main page');
})

app.use('/account', accountRoutes);
app.use('/board', boardRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

mongoose.connect(config.db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Connection to database was successful');
});

mongoose.connection.on('error', (err) => {
  console.log('Connection to database was not successful' + err);
});

app.listen(PORT, () => {
  console.log('Server has been started');
});