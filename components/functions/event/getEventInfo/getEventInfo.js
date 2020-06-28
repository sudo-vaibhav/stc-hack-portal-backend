const Event = require("../../../models/Event/Event")
const getEventInfo = (req, res) => {
    const eventId = req.params.eventId
    Event.findById(eventId)
        .populate("creator", "name email")
        .exec((err, doc) => {
            if (doc) {
                return res.status(200).send(doc.toJSON({
                    virtuals: true
                }))
            } else {
                return res.status(404).send({
                    message: "No Data Found!"
                })
            }
        })
}

module.exports = getEventInfo