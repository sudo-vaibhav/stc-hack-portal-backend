//Helper Functions
const getUser = require("../../user/profile/getUser/getUser");
const getTeam = require("../getTeam/getTeam");

const removeTeamMembers = async (req, res) => {
  const adminId = req.userId;
  const teamId = req.body.teamId;
  const memberIdsToRemove = req.body.memberIds;

  const adminQuery = await getUser(adminId, "byId");

  //check if admin exists
  if (adminQuery.status == 200) {
    //check if team exists
    const teamQuery = await getTeam(teamId, "byId");
    if (teamQuery.status == 200) {
      //check whether the user in this case is the admin of the team(i.e the admin has the authority to perform such actions)
      const team = teamQuery.payload;
      if (team.creatorId == adminId) {
        //check whether the user to be removed exists
        try {
          if (!memberIdsToRemove.includes(adminId)) {
            const userDocsToAwait = memberIdsToRemove
              //removing those ids that are not in team
              .filter((memberId) => team.members.includes(memberId))
              .map(async (memberId) => {
                const memberQuery = await getUser(memberId, "byId");
                const member = memberQuery.payload;

                //modify team and member documents
                team.members = team.members.filter(
                  (memberObject) => memberObject != memberId
                );
                member.teams = member.teams.filter(
                  (teamObject) => teamObject != teamId
                );

                return member.save();
              });

            await Promise.all(userDocsToAwait);
            await team.save();
            return res.status(200).send({
              message: "Users have been removed from the team",
            });
          } else {
            return res.status(400).send({
              message: "admin can't be removed, try deleting team if needed",
            });
          }
        } catch (err) {
          return res.status(500).send({
            message: "Internal Server Error",
          });
        }
      } else {
        return res.status(403).send({
          message: "You are not authorized to take this action",
        });
      }
    } else {
      return res.status(teamQuery.status).send(teamQuery.payload);
    }
  } else {
    return res.status(adminQuery.status).send(adminQuery.payload);
  }
};

module.exports = removeTeamMembers;
