const moment = require('moment')
const eventPostValidation = (event) => {
  if(moment(event.startDate, "DD-MM-YYYY").isAfter(moment(event.endDate, "DD-MM-YYYY")))
  {
    return new Error("Start Date cannot be after End Date!")
  }
}



module.exports = eventPostValidation

