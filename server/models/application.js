var mongoose = require('mongoose');
// var ApplicationDetailSchema = require('./application-detail.js');
var AppicationSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  target_year: {type: Number, required: true},
  target_month: {type: Number, required: true},
  use_date: {type: Date, required: true},
  traffic_type: {type: String, required: true},
  use_line: {type: String},
  departure_place: {type: String, required: true},
  arrival_place: {type: String, required: true},
  via_place1: {type: String},
  via_place2: {type: String},
  via_place3: {type: String},
  ticket_type: {type: String},
  round_trip_flag: {type: Boolean, default: false},
  fare: {type: Number, required: true},
  manual_input_flag: {type: Boolean, default: false},
  purpose: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});
module.exports = AppicationSchema;
