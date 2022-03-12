const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const boardRoutes = require('./routes/board')


const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Main page');
})

app.use('/account', boardRoutes);

mongoose.connect(config.db, {
  useUnifiedTopology: true,
  useNewUrlParser: true 
});

mongoose.connection.on('connected', () => {
  console.log('Connection to database was successful')
})

mongoose.connection.on('error', (err) => {
  console.log('Connection to db was not successful' + err)
})

app.listen(PORT, () => {
  console.log('Server has been started')
})