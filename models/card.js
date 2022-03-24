const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const Card = module.exports = model('Card', cardSchema);

module.exports.addCard = (newCard, list, callback) => list.updateOne({ $push: { cards: newCard } }, callback);