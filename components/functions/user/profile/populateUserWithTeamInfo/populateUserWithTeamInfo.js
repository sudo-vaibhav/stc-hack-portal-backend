const getTeam = require("../../../team/getTeam/getTeam")


const populateUserWithTeamInfo = async (user)=>{
    const userObject = {...user.toJSON()}
    const teamInfoQueries = []
    const inviteInfoQueries = []
    for await(const team of userObject.teams){
        teamInfoQueries.push(await getTeam(team,"byId"))  //this will return promises, we will await for their resolution later
    }

    for await (const invite of userObject.invites){
        inviteInfoQueries.push(await getTeam(invite, "byId")) //this will return promises, we will await for their resolution later
    }

    // await Promise.all([...teamInfoQueries,...inviteInfoQueries])

    const teamsInfo = []
    const invitesInfo = []
    for (const teamQuery of teamInfoQueries){
        const {_id,teamName,creatorId} = teamQuery.payload
        teamsInfo.push({_id,teamName,creatorId})
        // console.log("teamquery",teamQuery)
        // teamsInfo.push(teamQuery.payload)
    }

    for (const inviteQuery of inviteInfoQueries)  {   
        const {
            _id,
            teamName,
            creatorId
        } = inviteQuery.payload
        invitesInfo.push({
            _id,
            teamName,
            creatorId
        })
    }

    console.log(teamsInfo,invitesInfo)
    userObject.teamsInfo = teamsInfo
    userObject.invitesInfo = invitesInfo

    return Promise.resolve(userObject)

}

module.exports = populateUserWithTeamInfo