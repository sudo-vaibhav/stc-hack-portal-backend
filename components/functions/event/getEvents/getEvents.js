const Event = require("../../../models/Event/Event");
const PER_PAGE_LIMIT = 5;
//const getPaginatedData = require("../../../pagination/getPaginatedData/getPaginatedData");
const getEventPaginatedData = require("../../../pagination/getPaginatedData/getEventPaginatedData")
const getEvents = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo);
  const documents = await getEventPaginatedData(
    pageNo,
    PER_PAGE_LIMIT,
    "-__v -eventImage -minimumTeamSize -maximumTeamSize -eventUrl "
  );
  return res.status(200).send(documents);
};

module.exports = getEvents;
