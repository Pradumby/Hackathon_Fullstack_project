const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackathonSchema = new Schema({
  eventName: {type: String, required: true},
  date: {type: Date, required: true},
  description: {type: String, required: true},
  organizer: {type: Schema.Types.ObjectId, ref: "User", required: true},
});

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
module.exports = Hackathon;
