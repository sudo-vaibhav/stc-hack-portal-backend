const Team = require("../../../Team/Team")
const EventPostRemove = (event) => {
    const eventId = event._id
    Team.find({
            eventId
        })
        .then(async (teams, err) => {
            if (err) {
                console.log("error in post event removal")
            } else {
                const teamRemovesToAwait = teams.map(team => {
                    return team.remove()
                })
                await Promise.all(teamRemovesToAwait)
                console.log("all teams of the event have been removed")
            }
        })
}

module.exports = EventPostRemove