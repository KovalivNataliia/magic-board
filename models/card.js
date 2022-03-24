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

module.exports = model('Card', cardSchema);

module.exports.addCard = (newCard, list, callback) => list.updateOne({ $push: { cards: newCard } }, callback);

module.exports.deleteCard = (id, list, callback) => list.updateOne({ $pull: { cards: { _id: id } } }, callback);