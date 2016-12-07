var mongoose = require('mongoose');
var ApplicationDetailSchema = new mongoose.Schema({
  apply_detail_id: {type: String, required: true},
  apply_id: {type: String, required: true},
  use_date: {type: Date, required: true},
  traffic_type: {type: String, required: true},
  use_line: {type: String},
  departure_place: {type: String},
  arrival_place: {type: String},
  via_place1: {type: String},
  via_place2: {type: String},
  via_place3: {type: String},
  thicket_type: {type: String},
  round_trip_flag: {type: Boolean, default: false},
  fare: {type: Number},
  manual_input_flag: {type: Boolean, default: false},
  purpose: {type: String}
});
module.exports = ApplicationDetailSchema;
