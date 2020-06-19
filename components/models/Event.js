const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({
  _id: {
      type: String,
      required:true
  },
  creatorId: {
    type: String,
    required:true
  },
  startDate: {
    type:String,
    required:true
  },
  endDate: {
    type:String,
    required:true
  },
  location: {
    type:String,
    required:true
  },
  nameOfEvent: {
    type: String, 
    required: true
  },
  description: {
    type: String,
  },
  eventUrl: {
    type:String
  }
})

module.exports = mongoose.model("Event", EventSchema)