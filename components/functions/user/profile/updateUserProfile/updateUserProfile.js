const User = require("../../../../models/User/User")
const cleanUserSuppliedInput = require("../../../cleanUserSuppliedInput/cleanUserSuppliedInput")
const updateUserProfile = (req, res) => {
    delete req.body["_id"]
    delete req.body["email"]
    delete req.body["teams"]
    delete req.body["teamInvites"]
    delete req.body["squads"]
    delete req.body["squadInvites"]
    const userUpdatedData = cleanUserSuppliedInput(req.body)
    if(userUpdatedData.name!=""){
        User.update({
                _id: req.userId
            }, userUpdatedData)
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
    else{
        return res.status(400).send({
            message : "Name can't be an empty"
        })
    }
}

module.exports = updateUserProfile