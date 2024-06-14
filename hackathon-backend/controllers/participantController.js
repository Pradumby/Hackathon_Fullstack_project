const Participant = require("../models/Participant");

const registerParticipant = async (req, res) => {
  const {name, email, phone, experience, skills, hackathonId} = req.body;
  try {
    const newParticipant = new Participant({
      name,
      email,
      phone,
      experience,
      skills,
      hackathon: hackathonId,
    });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

const getParticipantsByHackathon = async (req, res) => {
  try {
    const participants = await Participant.find({
      hackathon: req.params.hackathonId,
    });
    res.json(participants);
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

module.exports = {registerParticipant, getParticipantsByHackathon};
