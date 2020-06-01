const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: {type: String, required: true},
  nameofevent: {type: String, required: true},
  startDate: {type:Date, required: true, default: new Date().toLocaleDateString()},
  endDate: {type: Date, required:true, default: new Date().toLocaleDateString()},
  requiredCriteria: {type:String},
  teamSize: {
    type:Number,
    size: {
      default: 2
    }
  },
  participationFees: {type: Number},
  prizes: {type: Number, }
})

module.exports = mongoose.model("Events", eventSchema)