const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory,
} = require("../controllers/leaderboardController");

router.get("/users", getUsers);
router.post("/users", addUser);
router.post("/claim/:userId", claimPoints);
router.get("/leaderboard", getLeaderboard);
router.get("/history", getHistory);

module.exports = router;
