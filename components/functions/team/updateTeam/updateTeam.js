//Helper Functions
const getTeam = require("../getTeam/getTeam")
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput")
const Team = require("../../../models/Team/Team")
const updateTeam = async (req, res) => {
    //first find the team
    const adminId = req.userId
    const teamId = req.params.teamId
    const teamQuery = await getTeam(teamId, "byId")
    const teamStatus = teamQuery.status
    const inputData = {
        ...req.body
    }
    delete inputData["creatorId"]
    delete inputData["_id"]
    delete inputData["eventId"]
    delete inputData["members"]
    delete inputData["pendingRequests"]
    const updatedTeamData = cleanUserSuppliedInput(inputData)
    //check if team exists
    if (teamQuery.status == 200) {
        let team = teamQuery.payload
        //then check if the user is the admin of the team
        if (team.creatorId == adminId) {

            //check that new team name (if any) is not already taken
            if (updatedTeamData.teamName) {
                const otherTeamWithSameName = await Team.findOne({
                    eventId: team.eventId,
                    teamName: updatedTeamData.teamName,
                    creatorId: {
                        $ne: team.creatorId  //not equal to 
                    }
                })
                if (otherTeamWithSameName) {
                    return res.status(400).send({
                        message: "Another team with same name already exists for the event"
                    })
                }
            }

            //then update that team
            try {
                await Team.findOneAndUpdate({
                    _id: teamId
                }, updatedTeamData)

                return res.status(200).send({
                    message: "Team updated successfully!"
                })
            } catch (error) {
                return res.status(500).send({
                    message: "Internal Server Error"
                })
            }

        } else {
            return res.status(400).send({
                message: "You don't have the correct access privileges for this action"
            })
        }

    } else {
        return res.status(teamStatus).send(teamQuery.payload)
    }
}

module.exports = updateTeam