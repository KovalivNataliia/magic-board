const { Schema, model } = require('mongoose');
const Card = require('../models/card');

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  cards: [Card.schema]
});

const List = module.exports = model('List', listSchema);

module.exports.getUsersLists = (userId, callback) => List.find({ userId: userId }, callback);

module.exports.getListById = (id, callback) => List.findById(id, callback);

module.exports.addList = (newList, callback) => newList.save(callback);

module.exports.changeList = (list, text, callback) => {
  list.title = text;
  list.save(callback);
}

module.exports.deleteList = (id, callback) => List.findByIdAndRemove(id, callback);