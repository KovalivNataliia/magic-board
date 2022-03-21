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

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  cards: cardSchema
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