const User = require("../../../../models/User/User")
const updateUserProfile = (req, res) => {
    delete req.body["_id"]
    delete req.body["email"]
    delete req.body["teams"]
    delete req.body["teamInvites"]
    delete req.body["squads"]
    delete req.body["squadInvites"]
    User.update({
            _id: req.userId
        }, req.body)
        .exec()
        .then(result => {
            return res.status(200).send({
                message: "User has been updated",
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal Server Error"
            })
        })
}

module.exports = updateUserProfile