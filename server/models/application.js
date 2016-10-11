var mongoose = require('mongoose');
var AppicationSchema = new mongoose.Schema({
  account_id: {
    type: String,
    required: true
  },
  apply_date: {
    type: Date
  },
  status: {
    type: String,
    default: '00'
  },
  include_pass_cost: {
    type: Boolean,
    default: false
  }
});
module.exports = AppicationSchema;
