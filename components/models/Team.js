const mongoose = require("mongoose")

const TeamSchema = mongoose.Schema({
  _id: {
    type:String,
    required: true
  },
  creatorId: {
    type: String,
    required:true
  },
  teamName: {
    type: String,
    required: true
  },
  hackathonId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  members:{
    type: [String],
    required: true
  },
  pendingRequests:{
    type: [String]
  }
})

const Team = mongoose.model("Team", TeamSchema)
module.exports = Team