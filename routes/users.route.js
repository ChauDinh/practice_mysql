const express = require("express");

const userControllers = require("../controllers/users.controller");

const router = express.Router();

router.get("/", userControllers.getUser);

router.get("/:id", userControllers.getUserById);

router.post("/create", userControllers.createUser);

module.exports = router;
