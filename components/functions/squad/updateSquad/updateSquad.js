const Squad = require("../../../models/Squad/Squad")
const updateSquad = async (req,res)=>{
    const data = {...req.body}
    const squadId = data.squadId
    delete data["_id"]
    delete data["creatorId"]
    delete data["members"]
    delete data["pendingRequests"]
    delete data["__v"]

    Squad.init().then(()=>{
        Squad.update({
            _id: squadId
        },data)
        .exec()
        .then(result=>{
            return res.status(200).send({
                message : "Squad Updated"
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: "Internal Server Error"
            })
        })
    })
}

module.exports = updateSquad