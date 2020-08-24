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
        type: String,
        validate: /^https?:\/\/github.com\/[^\/]*\/?$/
    },
    stackOverflowLink: {
        type: String,
        validate: /^https?:\/\/stackoverflow.com\/users\/[0-9]+\/[\w\d_.!@#$%&-*]+$/
    },
    externalLink: {
        type: String
    },
    teams: {
        type: [String]
    },
    teamInvites: {
        type: [String]
    },
    squadInvites: {
        type: [String]
    },
    squads: {
        type: [String]
    }

}, {
    id: false
})  //setting id to false prevents extra unneccessary id appearing when converting object to json

const User = mongoose.model("User", UserSchema)
// module.exports = {User,UserSchema}
module.exports = User