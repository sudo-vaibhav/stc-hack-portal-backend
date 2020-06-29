const Squad = require("../../../models/Squad/Squad")
const cleanUserSuppliedInput = require("../../cleanUserSuppliedInput/cleanUserSuppliedInput")
const updateSquad = async (req,res)=>{
    let updatedData = {...req.body}
    const squadId = updatedData.squadId
    delete updatedData["_id"]
    delete updatedData["creatorId"]
    delete updatedData["members"]
    delete updatedData["pendingRequests"]
    delete updatedData["__v"]
    updatedData = cleanUserSuppliedInput(updatedData)
    Squad.init().then(()=>{
        Squad.updateOne({
            _id: squadId
        },updatedData)
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