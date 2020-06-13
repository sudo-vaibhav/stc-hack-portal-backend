const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({
  _id: {
      type: String,
      required: true
  },
  startDate: {
    type:Date,
    required:true
  },
  endDate: {
    type:Date,
    required:true
  },
  location: {
    type:String,
    required:true
  },
  NameOfEvent: {
    type: String, 
    required: true
  },
  description: {
    type: String,
  },
  EventUrl: {
    type:String
  }
})

module.exports = mongoose.model("Events", EventSchema)