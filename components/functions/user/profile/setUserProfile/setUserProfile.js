const getUser = require("../getUser/getUser");
const User = require("../../../../models/User/User");
const cleanUserSuppliedInput = require("../../../cleanUserSuppliedInput/cleanUserSuppliedInput");

const setProfile = async (req, res, next) => {
  // constructing user json object from the data for use in mongoDB document
  // by default skills will be converted to lowercase to ensure ease in searching
  // profiles by skill later
  const userData = {
    ...req.body,
    _id: req.userId,
    email: req.email,
    squadInvites: [],
    teamInvites: [],
    squads: [],
    teams: [],
  };

  try {
    const user = new User(userData);
    const newUser = await user.save();
    return res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports = setProfile;
