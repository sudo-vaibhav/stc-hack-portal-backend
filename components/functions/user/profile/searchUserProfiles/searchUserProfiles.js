const PER_PAGE_LIMIT = 10;
const getPaginatedData = require("../../../../pagination/getPaginatedData/getPaginatedData");
const User = require("../../../../models/User/User");
const searchUserProfiles = async (req, res) => {
  const { skills } = req.body;
  const pageNo = parseInt(req.params.pageNo);
  const docs = await getPaginatedData(
    User,
    pageNo,
    PER_PAGE_LIMIT,
    "-__v -teams -teamInvites -squads -squadInvites",
    {
      skills: {
        $elemMatch: {
          $in: skills.map((skill) => skill.toLowerCase().trim()),
        },
      },
    }
  );
  return res.status(200).send(docs);
};

module.exports = searchUserProfiles;
