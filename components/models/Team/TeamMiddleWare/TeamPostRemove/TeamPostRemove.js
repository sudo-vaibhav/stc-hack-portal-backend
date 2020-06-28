const User = require("../../../User/User")
const TeamPostRemove = (team) => {
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

                await Promise.all(userSavesToAwait) // waiting for parallel save of document modification
            }
        })
}

module.exports = TeamPostRemove