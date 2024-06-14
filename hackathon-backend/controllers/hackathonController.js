const Hackathon = require("../models/Hackathon");

const createHackathon = async (req, res) => {
  const {eventName, date, description} = req.body;
  try {
    // console.log("User:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(400).json({error: "Organizer information is missing."});
    }

    const newHackathon = new Hackathon({
      eventName,
      date,
      description,
      organizer: req.user.id,
    });

    console.log("New Hackathon Data: ", newHackathon);

    const hackathonCreated = await newHackathon.save();
    res.status(201).json({hackathonCreated});
  } catch (err) {
    console.error("Error creating hackathon: ", err);
    res.status(500).json({error: "Server error", details: err.message});
  }
};

const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({error: "Hackathon not found"});
    }
    res.json(hackathon);
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

const updateHackathon = async (req, res) => {
  const {eventName, date, description} = req.body;
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({error: "Hackathon not found"});
    }
    hackathon.eventName = eventName;
    hackathon.date = date;
    hackathon.description = description;
    await hackathon.save();
    res.json(hackathon);
  } catch (err) {
    res.status(500).json({error: "Server error"});
  }
};

const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) {
      return res.status(404).json({error: "Hackathon not found"});
    }
    await hackathon.deleteOne();
    res.json({message: "Hackathon deleted"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

module.exports = {
  createHackathon,
  getHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
};
