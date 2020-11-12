const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var fs = require("fs");
/* GET users listing. */
router.get("/", function (req, res, next) {
  next();
  // res.send({message: 'respond with a resource'});
});

//Page created which returns 5 users read from users.txt found at public folder , retured in a JSON form.
let data;
fs.readFile("./public/users.txt", (err, content) => {
  if (err) throw err;
  data = content.toString();
});

router.get("/", (req, res) => {
  res.send(JSON.parse(JSON.stringify(data)));
});
module.exports = router;
