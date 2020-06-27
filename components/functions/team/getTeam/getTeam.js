const Team = require("../../../models/Team")

const processTeamQuery = (team) => {
        if (team) {
                return {
                        status: 200,
                        payload: team
                }
        } else {
                return {
                        status: 404,
                        payload: {
                                message: "Team not found"
                        }
                }
        }
}

const getTeam = async (teamIdentifier, searchParameter="byId") => {
        //searchBy stores whether querying will be done 
        //by id
        let team = undefined
        try {
                switch (searchParameter) {
        
                        case "byId":
                                team = await Team.findOne({
                                        _id: teamIdentifier
                                })
                                return processTeamQuery(team)
                        
                        case "byName":
                                team = await Team.findOne({
                                teamName: teamIdentifier
                                })
                                return processTeamQuery(team)

                        default:
                                // if no proper search parameter is given
                                // search will be done by id
                                team = await Team.findOne({
                                        _id: teamIdentifier
                                })
                                return processTeamQuery(team)
                }
        } catch (err) {
                return {
                        status: 500,
                        payload: {
                                message: "Internal server error"
                        }
                }
        }
}

module.exports = getTeam