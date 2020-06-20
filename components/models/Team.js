const mongoose = require("mongoose")

const TeamSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true,
        ref: 'Event'
    },
    description: {
        type: String
    },
    members: {
        type: [String],
        required: true
    },
    pendingRequests: {
        type: [String],
        required: true
    },
    skillsRequired: {
        type: [String],
        required: true
    }
})

const Team = mongoose.model("Team", TeamSchema)
module.exports = Team