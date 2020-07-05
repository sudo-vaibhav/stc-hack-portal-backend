const PER_PAGE_LIMIT = 10;
const User = require("../../../../models/User/User");
const getPaginatedData = require("../../../../pagination/getPaginatedData/getPaginatedData");
const getProfiles = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo);
  const documents = await getPaginatedData(
    User,
    pageNo,
    PER_PAGE_LIMIT,
    "-__v -teams -teamInvites -squads -squadInvites"
  );
  return res.status(200).send(documents);
};
module.exports = getProfiles;
