const Team = require("../../../models/Team/Team")
const getUser = require("../../user/profile/getUser/getUser")
const getEvent = require("../../event/getEvent/getEvent")
const mongoose = require("mongoose")
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput")
const setTeam = async (req, res) => {

    const eventQuery = await getEvent(req.body.eventId, "byId")
    if (eventQuery.status == 200) {
        const creatorQuery = await getUser(req.userId, "byId")

        //this will check if user has completed their profile or not
        if (creatorQuery.status == 200) {

            //check if another event doesn't have the same team name
            const otherTeamWithSameName = await Team.findOne({
                eventId : req.body.eventId,
                teamName : req.body.teamName
            })

            if(!otherTeamWithSameName){
                
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
                        } else {

                            const teamData = cleanUserSuppliedInput({
                                teamName: req.body.teamName,
                                eventId : req.body.eventId,
                                description: req.body.description,
                                skillsRequired: req.body.skillsRequired
                            })
                            const team = new Team({
                                _id: new mongoose.Types.ObjectId().toString(),
                                creatorId: req.userId,
                                teamName: teamData.teamName,
                                eventId: teamData.eventId,
                                description: teamData.description,
                                members: [req.userId],
                                skillsRequired:  teamData.skillsRequired || [],
                                pendingRequests: []
                            })
                            team.save()
                                .then(async (newTeam) => {
                                    const creator = creatorQuery.payload
                                    creator.teams.push(newTeam._id)
                                    await creator.save()
                                    return res.status(200).send(newTeam)
                                })
                        }
                    })
                    .catch(err => {
                        return res.status(500).send({
                            message: "internal server error"
                        })
                    })
            }
            else{
                return res.status(400).send({
                    message : "Another team with same name already exists"
                })
            }

        } else {
            return res.status(creatorQuery.status).send(creatorQuery.payload)
        }

    } else {
        return res.status(eventQuery.status).send(eventQuery.payload)
    }
}

module.exports = setTeam