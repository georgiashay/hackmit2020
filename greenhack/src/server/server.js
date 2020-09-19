var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require("cors");
var SchemaTypes = mongoose.Schema.Types;
var creds = require("./creds.json");

mongoose.connect("mongodb+srv://" + creds.username + ":" + creds.password + "@foodproject.uomew.gcp.mongodb.net/food");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({"extended": "true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const FoodSchema = new mongoose.Schema({
  name: String,
  ced: Number,
  ghg: Number
}, { collection: "food"});

var Food = mongoose.model("food", FoodSchema);

app.get("/api/foods", function(req, res) {
  console.log("Fetching foods");
  Food.find(function(err, foods) {
    if (err) {
      res.send(err);
    }
    res.json(foods);
  })
});

app.listen(8080);
