const express = require("express");

const router = express.Router();

router.get("/health-check", (res) => res.send("server is running"))