var http = require("http");
var fs = require("fs");
const fileupload = require('express-fileupload')
const path = require('path');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');

var express = require('express');
var app = express();


app.use(express.urlencoded({
  extended: false
}));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/submit', (req, res) => {
    response = {
        name: req.body.name,
        price: { formatted_with_symbol: req.body.price},
        media:{source: '../images/' + req.body.image},
        description: req.body.description,
    };
    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
        if (err) throw err;
        //console.log("Connected to Database");
        var dbo = db.db("mydb");

        dbo.collection("product").insertOne(response, (err, result) => {
          if (err) throw err;
          //console.log(response);
          res.end(JSON.stringify(response));
        });
      });
  })

  app.get('/products', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
      if (err) throw err;
     // console.log("Connected to Database");
      var dbo = db.db("mydb");

      dbo.collection("product").find({}).toArray(function(err, result) {
        if (err) throw err;
       // console.log(result);
        res.send(JSON.stringify(result));
        db.close();
      });
    });
  })

  var server = app.listen(8000, function() {
    console.log('Node server is running.. at  http://localhost:8000/');
  });