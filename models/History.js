const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  points: { type: Number, required: true },
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", historySchema);
