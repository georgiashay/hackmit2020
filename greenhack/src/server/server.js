var express = require("express");
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cors = require("cors");
var Schema = mongoose.Schema
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
  _id: Schema.ObjectId,
  desc: String,
  weight_basis: String,
  ced: Number,
  ghg: Number
}, { collection: "food"});

const EntrySchema = new mongoose.Schema({
  food_id: Schema.ObjectId,
  food_name: String,
  grams: Number,
  total_ced: Number,
  total_ghg: Number,
  meal: String,
  date: Date
}, { collection: "entries"});

var Food = mongoose.model("food", FoodSchema);
var Entry = mongoose.model("entry", EntrySchema);

app.get("/api/foods", function(req, res) {
  Food.find(function(err, foods) {
    if (err) {
      res.send(err);
    }
    res.json(foods);
  })
});

app.post("/api/addEntry", function(req, res) {
  Entry.create({
    food_id: req.body.food_id,
    food_name: req.body.food_name,
    grams: req.body.grams,
    total_ced: req.body.total_ced,
    total_ghg: req.body.total_ghg,
    meal: req.body.meal,
    date: req.body.date
  }, function(err, entry) {
    if (err) {
      res.send(err);
    }
    res.json(entry);
  })
});

app.get("/api/getEntries", function(req, res) {
  var query = {};
  if (req.query.minDate) {
    query.date = {
      $gte: req.query.minDate,
      $lte: req.query.maxDate
    }
  }
  Entry.find(query, function (err, entries) {
    if (err) {
      res.send(err);
    }
    res.json(entries);
  });
});

app.listen(8080);
