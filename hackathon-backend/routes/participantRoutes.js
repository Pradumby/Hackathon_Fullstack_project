const express = require("express");
const {
  registerParticipant,
  getParticipantsByHackathon,
} = require("../controllers/participantController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerParticipant);
router.get("/:hackathonId", getParticipantsByHackathon);

module.exports = router;
