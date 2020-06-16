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
    type:mongoose.Schema.Types.ObjectId, 
    ref: 'Events',
    required: true
  },
  description: {
    type: String
  },
  members: {
    type:[String],
    required: true
  },
  skillsRequired: 
  {
    type:[String]
  }
})

const Team = mongoose.model("Team", TeamSchema)
module.exports = Team