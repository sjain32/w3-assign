const User = require("../models/User");
const History = require("../models/History");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.addUser = async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, points });
  await history.save();

  global.io.emit("leaderboard-updated");
  res.json({ user, points });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users.map((u, i) => ({
    name: u.name,
    avatar: u.avatar,
    totalPoints: u.totalPoints,
    rank: i + 1,
  })));
};

exports.getHistory = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const [history, total] = await Promise.all([
    History.find().populate("userId", "name").sort({ claimedAt: -1 }).skip(skip).limit(limit),
    History.countDocuments(),
  ]);

  res.json({
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: history,
  });
};
