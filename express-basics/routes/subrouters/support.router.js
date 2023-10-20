const express = require("express");

const supportController = require("../../controllers/support.controller");

const supportRouter = express.Router();

supportRouter.get("/data", supportController.getSupport);

module.exports = supportRouter;
