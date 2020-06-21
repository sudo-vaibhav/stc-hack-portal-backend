const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    expectedGraduation: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },

    skills: [{
        type: String
    }],

    githubLink: {
        type: String
    },
    stackOverflowLink: {
        type: String
    },
    externalLink: {
        type: String
    },
    teams: {
        type: [String],
        required: true
    },
    invites: {
        type: [String],
        required: true
    }

})

const User = mongoose.model("User", UserSchema)
module.exports = User