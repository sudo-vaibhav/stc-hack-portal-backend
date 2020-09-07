const mongoose = require("mongoose");
const moment = require("moment")
const EventPostRemove = require("./EventMiddleware/EventPostRemove/EventPostRemove");
const EventPostValidate = require("./EventMiddleware/EventPostValidate/EventPostValidate");
// const dateRegex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((1[6-9]|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;

const EventSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      immutable: true,
    },
    creatorId: {
      type: String,
      required: true,
      immutable: true,
    },
    startTime: {
      type: Date,
      required: true,
      validate: [
        function () {
          return this.startDate.getTime() > Date.now().getTime();
        },
        "Start date should not be in the past",
      ],
    },
    endDate: {
      type: Date,
      required: true,
      validate: [
        function () {
          return this.endDate > this.startDate;
        },
        "End time should be after start time",
      ],
    },
    location: {
      type: String,
      required: true,
    },
    nameOfEvent: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventUrl: {
      type: String,
      validate: /^(http|https):\/\/[^ "]+$/,
    },
    minimumTeamSize: {
      type: Number,
      required: true,
    },
    maximumTeamSize: {
      type: Number,
      required: true,
    },
    eventImage: {
      type: String,
      required: true,
      validate: /^data:image\/[^;]+;base64[^"]+$/,
    },
  },
  {
    id: false,
  }
); //setting id to false prevents extra unneccessary id appearing when converting object to json)

//this will populate the event with creator info
EventSchema.virtual("creator", {
  ref: "User",
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
});

EventSchema.post("remove", EventPostRemove);

// EventSchema.post("validate", EventPostValidate);

module.exports = mongoose.model("Event", EventSchema);
