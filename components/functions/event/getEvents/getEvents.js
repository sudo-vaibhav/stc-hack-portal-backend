const Event = require('../../../models/Event/Event');
const PER_PAGE_LIMIT = 10
const getPaginatedData = require("../../../pagination/getPaginatedData/getPaginatedData")
const getShareableEventDocs = require("../../event/getShareableEventDocs/getShareableEventDocs")
const getEvents = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo)
  documents = await getPaginatedData(Event, pageNo, PER_PAGE_LIMIT)
    Event.find()
        .sort({'_id': -1})
        .exec()
        .then(docs => {
            return res.status(200).send(getShareableEventDocs(documents))
        })
        .catch(err => {
            return res.status(500).send({
                error: "Internal Server Error"
            })
        })
}

module.exports = getEvents