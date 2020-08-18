const mongoose = require("mongoose");
const EventPostRemove = require("./EventMiddleware/EventPostRemove/EventPostRemove");

const EventSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
      validate:{
        validator: function(input) {
          return /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((1[6-9]|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(input);
        },
        message: error => `${error.value} is not a valid format for the date!`
      }
    },
    endDate: {
      type: String,
      required: true,
      validate:{
        validator: function(input) {
          return /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((1[6-9]|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((1[6-9]|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/.test(input);
        },
        message: error => `${error.value} is not a valid format for the date!`
      }
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
    },
    eventUrl: {
      type: String,
      validate:{
        validator: function(input) {
          return /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(input);
        },
        message: error => `${error.value} is not a valid format for the url!`
      }
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

module.exports = mongoose.model("Event", EventSchema);
