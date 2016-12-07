var mongoose = require('mongoose');
var AppicationSchema = new mongoose.Schema({
  apply_id: {type: String, required: true},
  user_id: {type: String, required: true},
  target_month: {type: Number, required: true},
  apply_date: {type: Date},
  status: {type: String, default: '1'},
  total_fare: {type: Number},
  manage_user_id: {type: Number},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});
module.exports = AppicationSchema;
