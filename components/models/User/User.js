const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      immutable: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
      trim: true,
    },
    expectedGraduation: {
      type: String,
      required: true,
      validate: /^20\d\d$/,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
        validate: /^.+$/, //so it can't be empty string
      },
    ],

    githubLink: {
      type: String,
      validate: /^(https?:\/\/github.com\/[^\/]*\/?)?$/,
    },
    stackOverflowLink: {
      type: String,
      validate: /^(https?:\/\/stackoverflow.com\/users\/[0-9]+\/[\w\d_.!@#$%&-*]+)?$/,
    },
    externalLink: {
      type: String,
      default: "",
    },
    teams: {
      type: [String],
    },
    teamInvites: {
      type: [String],
    },
    squadInvites: {
      type: [String],
    },
    squads: {
      type: [String],
    },
  },
  {
    id: false,
  }
); //setting id to false prevents extra unneccessary id appearing when converting object to json

const User = mongoose.model("User", UserSchema);
// module.exports = {User,UserSchema}
module.exports = User;
