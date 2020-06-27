const mongoose = require("mongoose")
const User = require("./User")
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
SquadSchema.post("remove", (squad) => {
    const squadId = squad._id
    User.find({
            $or: [{
                    squads: squadId
                },
                {
                    squadInvites: squadId
                }
            ]
        })
        .then(async (users, err) => {
            if (err) {
                console.log("could not find users after removing squad", err)
            } else {

                const userSavesToAwait = users.map(user => {

                    if (user.squads.includes(squadId)) {
                        const updatedUserSquads = user.squads.filter(currentId => currentId != squadId)
                        user.squads = updatedUserSquads
                    }

                    if (user.squadInvites.includes(squadId)) {
                        const updatedUserInvites = user.invites.filter(currentId => currentId != squadId)
                        user.squadInvites = updatedUserInvites
                    }

                    return user.save() // we will await these saves in parallel later
                    // to improve efficiency
                })

                await Promise.all(userSavesToAwait) // waiting for parallel save of document modification
            }
        })

})


const Squad = mongoose.model("Squad", SquadSchema)
module.exports = Squad