const mongoose = require("mongoose");
const TeamPostRemove = require("./TeamMiddleWare/TeamPostRemove/TeamPostRemove");
const TeamSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    immutable: true,
  },
  creatorId: {
    type: String,
    required: true,
    immutable: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
    ref: "Event",
    immutable: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    default: "",
  },
  members: {
    type: [String],
    required: true,
    default: [],
  },
  pendingRequests: {
    type: [String],
    required: true,
    default: [],
  },
  skillsRequired: {
    type: [
      {
        type: String,
        lowercase: true,
        trim: true,
        validate: /^.+$/, //so it can't be empty string
      },
    ],
    required: true,
    default: [],
  },
});

// we need to remove all mentions of this team id in user records
// be it either invitee status or membership status
TeamSchema.post("remove", TeamPostRemove);

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
