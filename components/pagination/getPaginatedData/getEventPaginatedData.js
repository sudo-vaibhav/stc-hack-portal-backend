const Event = require("../../models/Event/Event");
const getEventPaginatedData = async (
  pageNumber,
  perPageLimit,
  shareableDocConfig = "",
  queryConditions = {}
) => {
  const paginatedDataInfo = {};

  // we will return total page count only for the first
  // page query instead of double scanning for each query
  // a smart optimisation suggested by @NavdeepChawla
  if (pageNumber == 1) {
    const totalCount = await Event.find({
      startDate: { $gte: Date.now() },
    }).count();
    paginatedDataInfo.totalPageCount = Math.ceil(totalCount / perPageLimit);
    paginatedDataInfo.totalCount = totalCount;
  }

  paginatedDataInfo.documents = await Event.find({
    startDate: { $gte: Date.now() },
  })
    .sort({ startDate: +1 })
    .select(shareableDocConfig)
    .limit(perPageLimit)
    .skip((pageNumber - 1) * perPageLimit)
    .lean();

  return paginatedDataInfo;
};

module.exports = getEventPaginatedData;
