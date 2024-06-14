const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  experience: {type: String, required: true},
  skills: {type: String, required: true},
  hackathon: {type: Schema.Types.ObjectId, ref: "Hackathon", required: true},
});

module.exports = mongoose.model("Participant", participantSchema);
