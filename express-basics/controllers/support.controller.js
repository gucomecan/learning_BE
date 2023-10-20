const model = require("../models/friends.model");

function getSupport(req, res) {
  res.json(model);
}

module.exports = { getSupport };
