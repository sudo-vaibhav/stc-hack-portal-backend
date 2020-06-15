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
  hackathonName: {
    type: String,
    required: true
  },
  hackathonLink: {
    type: String
  },
  description: {
    type: String
  },
  teamSize: {
    type: Number,
    size: {
      default: 2,
      required: true
    }
  },
  teamUrl: {
    type:String
  }
})

const Team = mongoose.model("Team", TeamSchema)
module.exports = Team