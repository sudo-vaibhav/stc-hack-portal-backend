const getUser = require("../getUser/getUser");
const getShareableUserDocs = require("../../getShareableUserDocs/getShareableUserDocs");
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const userQuery = await getUser(userId, "byId");
  if (userQuery.status == 200) {
    const shareableDoc = getShareableUserDocs([userQuery.payload])[0];
    return res.status(200).send(shareableDoc._doc);
  } else {
    return res.status(400).send({
      message: userQuery.payload,
    });
  }
};
module.exports = getUserById;
