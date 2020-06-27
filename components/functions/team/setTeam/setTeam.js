const Team = require("../../../models/Team")
const getUser = require("../../user/profile/getUser")
const getEvent = require("../../event/getEvent")
const setTeam = async (req, res) => {

    const eventQuery = await getEvent(req.body.eventId, "byId")
    if (eventQuery.status == 200) {
        const creatorQuery = await getUser(req.userId, "byId")

        //this will check if user has completed their profile or not
        if (creatorQuery.status == 200) {

            //check if user doesn't already have a team in same event already
            Team.findOne({
                    members: req.userId,
                    eventId: req.body.eventId
                })
                .then(otherTeam => {
                    if (otherTeam) {
                        return res.status(400).send({
                            message: "You already have a team for the same event"
                        })
                    }
                    else{
                      Team.init().then(() => {
                        const team = new Team({
                            _id: new mongoose.Types.ObjectId().toString(),
                            creatorId: req.userId,
                            teamName: req.body.teamName,
                            eventId: req.body.eventId,
                            description: req.body.description,
                            members: [req.userId],
                            skillsRequired: req.body.skillsRequired || [],
                            pendingRequests: []
                        })
                        team.save()
                            .then(async (newTeam) => {
                                const creator = creatorQuery.payload
                                creator.teams.push(newTeam._id)
                                await creator.save()
                                return res.status(200).send(newTeam)
                            })
                            .catch(err => {
                              return res.status(400).send({
                                  message: "Duplicate team name, choose another name."
                              })
                          })
                    }) 
                  }})
                .catch(err=>{
                    return res.status(500).send("internal server error")
                })

        } else {
            return res.status(creatorQuery.status).send(creatorQuery.message)
        }

    } else {
        return res.status(eventQuery.status).send(eventQuery.payload)
    }
}

module.exports = setTeam