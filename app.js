const express = require("express"); 
const app = express();
const connectDB = require("./config/db");
const leaderboardRoutes = require("./routes/leaderboard");
const cors = require("cors");
require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", leaderboardRoutes);

module.exports = app;
