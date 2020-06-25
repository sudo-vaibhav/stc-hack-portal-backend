const mongoose = require("mongoose")

const EventSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    nameOfEvent: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    eventUrl: {
        type: String
    },
    minimumTeamSize: {
        type: Number,
        required: true
    },
    maximumTeamSize: {
        type: Number,
        required: true
    },
}, {
    id: false
}) //setting id to false prevents extra unneccessary id appearing when converting object to json

EventSchema.virtual("creator", {
    ref: "User",
    localField: "creatorId",
    foreignField: "_id",
    justOne: true
})
module.exports = mongoose.model("Event", EventSchema)