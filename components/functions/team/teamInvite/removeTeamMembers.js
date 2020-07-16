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
            memberIdsToRemove.forEach(async (memberId) => {
              const memberQuery = await getUser(memberId, "byId");
              if (memberQuery.status == 200) {
                //check whether the members of the team include the user to be removed
                const member = memberQuery.payload;
                if (team.members.includes(memberId)) {
                  //modify team and member documents
                  team.members = team.members.filter(
                    (memberObject) => memberObject != memberId
                  );
                  member.teams = member.teams.filter(
                    (teamObject) => teamObject != teamId
                  );

                  await Promise.all([member.save(), team.save()]);

                  return res.status(201).send({
                    message: "User has been removed from the team",
                  });
                }
              }
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
