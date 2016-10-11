var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  account_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = UserSchema;

// {
//     "_id": ObjectID(),
//     "account_id": "111111",
//     "name": "中嶋　信哉",
//     "password": "555555",
//     "created_at": ISODate(),
//     "updated_at": ISODate()
// }
