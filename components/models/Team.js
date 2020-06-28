const mongoose = require("mongoose")
const User = require("../models/User")
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
        required: true,
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



// we need to remove all mentions of this team id in user records
// be it either invitee status or membership status
TeamSchema.post("remove", (team) => {
    const teamId = team._id
    User.find({
            $or: [{
                    teams: teamId
                },
                {
                    invites: teamId
                }
            ]
        })
        .then(async (users, err) => {
            if (err) {
                console.log("could not find users after removing team", err)
            } else {

                const userSavesToAwait = users.map(user => {

                    if (user.teams.includes(teamId)) {
                        const updatedUserTeams = user.teams.filter(currentId => currentId != teamId)
                        user.teams = updatedUserTeams
                    }

                    if (user.invites.includes(teamId)) {
                        const updatedUserInvites = user.invites.filter(currentId => currentId != teamId)
                        user.invites = updatedUserInvites
                    }

                    return user.save() // we will await these saves in parallel later
                                       // to improve efficiency
                })

                await Promise.all(userSavesToAwait)  // waiting for parallel save of document modification
            }
        })

})



const Team = mongoose.model("Team", TeamSchema)
module.exports = Team