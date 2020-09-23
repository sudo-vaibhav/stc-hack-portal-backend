const mongoose = require('mongoose');

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
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    githubLink: {
      type: String,
      //validate: /^https?:\/\/github.com\/[^\/]*\/?$/
      validate: [
        function(v) {
          var re = /^https?:\/\/github.com\/[^\/]*\/?$/;
          return (v == null) || re.test(v)
      },
        'Please enter a valid GitHub Link',
      ],
    },
    stackOverflowLink: {
      type: String,
      //validate: /^https?:\/\/stackoverflow.com\/users\/[0-9]+\/[\w\d-?_.!@#$%^&-()*]+$/,
      validate: [
        function(v) {
          var re = /^https?:\/\/stackoverflow.com\/users\/[0-9]+\/[\w\d-?_.!@#$%^&-()*]+$/;
          return (v == null) || re.test(v)
      },
        'Please enter a valid StackOverFlow Link',
      ]
    },
    externalLink: {
      type: String,
      //validate: /^((http|https):\/\/[^ "]+)$/,
      validate: [
        function(v) {
          var re = /^((http|https):\/\/[^ "]+)$/;
          return (v == null) || re.test(v)
      },
        'Please enter a valid External Link',
      ]
    },
    teams: {
      type: [String],
      default: [],
    },
    teamInvites: {
      type: [String],
      default: [],
    },
    squadInvites: {
      type: [String],
      default: [],
    },
    squads: {
      type: [String],
      default: [],
    },
  },
  {
    id: false,
  }
); //setting id to false prevents extra unneccessary id appearing when converting object to json

const User = mongoose.model('User', UserSchema);
// module.exports = {User,UserSchema}
module.exports = User;
