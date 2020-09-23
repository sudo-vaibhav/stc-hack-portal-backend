const User = require('../../../../models/User/User');
const cleanUserSuppliedInput = require('../../../cleanUserSuppliedInput/cleanUserSuppliedInput');
const updateUserProfile = async (req, res, next) => {
  delete req.body['teams'];
  delete req.body['teamInvites'];
  delete req.body['squads'];
  delete req.body['squadInvites'];
  const userUpdatedData = cleanUserSuppliedInput(req.body);
  try {
    const user = await User.findOne({
      _id: req.userId,
    });

    if (user) {
      console.log(user);
      console.log('inside if statement');
      Object.keys(req.body).forEach((key) => {
        // user[key] = req.body[key];
        user[key] = req.body[key] === null ? undefined : req.body[key];
      });
    }
    await user.save();
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = updateUserProfile;
