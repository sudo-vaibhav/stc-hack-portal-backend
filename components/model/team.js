const mongoose = require("mongoose")

const TeamsSchema = mongoose.Schema({
  _id: {
    type:String,
    required: true
  },
  TeamName: {
    type: String,
    required: true
  },
  HackathonName: {
    type: String,
    required: true
  },
  HackathonLink: {
    type: String
  },
  description: {
    type: String
  },
  TeamSize: {
    type: Number,
    size: {
      default: 2,
      required: true
    }
  },
  TeamUrl: {
    type:String
  }
})


module.exports = mongoose.model("Teams", TeamsSchema)