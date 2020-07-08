const getUser = require("../getUser/getUser");
const populateUserWithTeamsAndSquadInfo = require("../populateUserWithTeamAndSquadInfo/populateUserWithTeamAndSquadInfo");
const getUserProfile = async (req, res) => {
  const responseData = await getUser(req.userId, "byId");
  const statusCode = responseData.status;
  const payload = responseData.payload;
  if (statusCode == 200) {
    const userWithTeamAndSquadInfo = await populateUserWithTeamsAndSquadInfo(
      payload
    );
    return res.status(statusCode).send(userWithTeamAndSquadInfo);
  } else {
    return res.status(statusCode).send(payload);
  }
};
module.exports = getUserProfile;
