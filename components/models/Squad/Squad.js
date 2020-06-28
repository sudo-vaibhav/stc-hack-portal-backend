const mongoose = require("mongoose")
const SquadPostRemove = require("./SquadMiddleware/SquadPostRemove/SquadPostRemove")
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

// we need to remove all mentions of this squad id in user records
// be it either invitee status or membership status
SquadSchema.post("remove", SquadPostRemove)


const Squad = mongoose.model("Squad", SquadSchema)
module.exports = Squad