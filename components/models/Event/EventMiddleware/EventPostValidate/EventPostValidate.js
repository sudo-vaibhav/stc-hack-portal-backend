const moment = require("moment");
module.exports = (doc) => {
  if (doc.minimumTeamSize > doc.maximumTeamSize) {
    throw new Error(
      "minimum team size should be less that or equal to maximum team size"
    );
  }
  if (
    moment(doc.startDate, "DD-MM-YYYY").isAfter(
      moment(doc.endDate, "DD-MM-YYYY")
  )) {
    throw new Error("Start Date cannot be after End Date!");
  }
};
