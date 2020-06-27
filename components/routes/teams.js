const Router = require("express").Router();

//helper functions for simplifying code
const sendTeamInvite = require("../functions/team/invite/sendTeamInvite")
const cancelInvite = require("../functions/team/invite/cancelInvite")
const getTeam = require("../functions/team/getTeam/getTeam")
const removeMember = require("../functions/team/invite/removeMember")
const getTeamInfoByAccessLevel = require("../functions/team/getTeam/getTeamInfoByAccessLevel")
const setTeam = require("../functions/team/setTeam/setTeam")
const deleteTeam = require("../functions/team/deleteTeam/deleteTeam")
//authentication middleware
const checkAuth= require("../middleware/checkAuth");

Router.get("/getteaminfo/:teamId", checkAuth, async (req, res) => {
    const teamId = req.params.teamId;
    const userId = req.userId
    const teamQuery = await getTeam(teamId, "byId")

    if (teamQuery.status === 200) {
        const team = teamQuery.payload
        teamInfo = await getTeamInfoByAccessLevel(userId, team)
        if(teamInfo){
            return res.status(200).send(teamInfo)
        }
        else{
            return res.status(403).send({
                message: "You don't possess the adequate priviledges to access this team"
            })
        }
    } else {
        return res.status(teamQuery.status).send(teamQuery.payload)
    }
})

Router.post("/setteam", checkAuth, setTeam)
Router.post("/sendinvite", checkAuth, sendTeamInvite)
Router.post("/cancelinvite", checkAuth, cancelInvite)
Router.post("/removemember", checkAuth, removeMember)
Router.post("/deleteteam",checkAuth, deleteTeam)
/*Router.patch("/updateTeam/:Id",(req,res,next) => {
  return res.status(200).json({
    message: "Team updated"
  })
})
*/
module.exports = Router