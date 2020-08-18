const mongoose = require("mongoose");
const TeamPostRemove = require("./TeamMiddleWare/TeamPostRemove/TeamPostRemove");
const TeamSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    // validate : /^.{24}$/
  },
  creatorId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
    ref: "Event",
  },
  eventId: {
    type: String,
    required: true,
    ref: "Event",
  },
  description: {
    type: String,
  },
  members: {
    type: [String],
    required: true,
  },
  pendingRequests: {
    type: [String],
    required: true,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
});

// we need to remove all mentions of this team id in user records
// be it either invitee status or membership status
TeamSchema.post("remove", TeamPostRemove);

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
