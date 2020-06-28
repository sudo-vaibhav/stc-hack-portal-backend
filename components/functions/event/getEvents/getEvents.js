const Event = require('../../../models/Event/Event');
const PER_PAGE_LIMIT = 10
const getPaginatedData = require("../../../pagination/getPaginatedData/getPaginatedData")
const getShareableEventDocs = require("../../event/getShareableEventDocs/getShareableEventDocs")
const getEvents = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo)
  const documents = await getPaginatedData(Event, pageNo, PER_PAGE_LIMIT)
  return res.status(200).send(getShareableEventDocs(documents))
}

module.exports = getEvents