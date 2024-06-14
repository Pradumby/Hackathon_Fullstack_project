const express = require("express");
const {
  createHackathon,
  getHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
} = require("../controllers/hackathonController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createHackathon);
router.get("/", getHackathons);
router.get("/:id", authMiddleware, getHackathonById);
router.put("/:id", updateHackathon);
router.delete("/:id", deleteHackathon);

module.exports = router;
