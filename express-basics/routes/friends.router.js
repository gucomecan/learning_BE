const express = require("express");
const friendsController = require("../controllers/friends.controller");
const supportRouter = require("./subrouters/support.router");

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
  console.log("custom midleware for friend");
  next();
});
friendsRouter.use("/support", supportRouter);
friendsRouter.get("/", friendsController.getFiends);
friendsRouter.get("/:friendId", friendsController.getFiend);
friendsRouter.post("/", friendsController.postFriend);

module.exports = friendsRouter;
