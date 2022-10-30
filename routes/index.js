var express = require("express");
var handleRequest = require("./handler");
var router = express.Router();

router.all(/.*/, (req, res) => {
  // res.render("index", { title: "Express" });
  const response = handleRequest(req, res);
});

module.exports = router;
