const User = require("../../../../models/User/User");
const cleanUserSuppliedInput = require("../../../cleanUserSuppliedInput/cleanUserSuppliedInput");
const updateUserProfile = async (req, res, next) => {
  delete req.body["teams"];
  delete req.body["teamInvites"];
  delete req.body["squads"];
  delete req.body["squadInvites"];
  const userUpdatedData = cleanUserSuppliedInput(req.body);
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      { $set: userUpdatedData },
      {
        runValidators: true,
        returnOriginal: false
      }
    );
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserProfile;
