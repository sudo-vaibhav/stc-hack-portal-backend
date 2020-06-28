const User = require("../../../User/User")

const SquadPostRemove = (squad) => {
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
                        user.squads = user.squads.filter(currentId => currentId != squadId)
                    }

                    if (user.squadInvites.includes(squadId)) {
                        user.squadInvites = user.squadInvites.filter(currentId => currentId != squadId)
                    }

                    return user.save() // we will await these saves in parallel later
                    // to improve efficiency
                })

                await Promise.all(userSavesToAwait) // waiting for parallel save of document modification
            }
        })

}

module.exports = SquadPostRemove