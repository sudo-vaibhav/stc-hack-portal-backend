const mongoose = require("mongoose")

const SquadSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    squadName: {
        type: String,
        required: true,
        unique: true
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

const Squad = mongoose.model("Squad", SquadSchema)

module.exports = Squad