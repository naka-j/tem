var mongoose = require('mongoose');
var ApplicationDetailSchema = require('./application-detail.js');
var AppicationSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  target_month: {type: Number, required: true},
  apply_date: {type: Date},
  status: {type: String, default: '1'},
  total_fare: {type: Number},
  manage_user_id: {type: Number},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  details: [ApplicationDetailSchema]
});
module.exports = AppicationSchema;
