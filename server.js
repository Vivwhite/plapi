var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors');

app.use(cors());

// parse incoming urlencoded from data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// allow cross origin requests

app.use(function(req, res, next) {
  res.header("Access-Controll-Allow-Origin", "*");
  res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

// **************
//    DATABASE
// **************
var db = require('./models');
var Lego = db.Lego;
// html endpoints
app.get('/', function homepage(req, res){
  res.sendFile(__dirname+'/views/index.html');
});

app.get('/api', function apiIndex(req, res){
  res.json({
    message: "LEGOplaygroud-API",
    endpoint: [
      {method: "GET", path: "/api", description: "Describes all availbale endpoints."},
    ]
  })
});


// show api
app.get('/legos', function(req, res){
  db.Lego.find(function(err, allLegos){
    err ? res.status(500).json({error:err.message}):
    res.json({legos: allLegos});
  });
});


app.get('/legos/:id', function(req, res){
  var legoId = req.params.id;
  db.Lego.findOne({ _id: legoId }, function(err, foundLego){
    err ? res.status(500).json({error:err.message}):
    res.json(foundLego);
    console.log('it works')
  });
});

app.post('/legos', function(req, res){
  var newLego = req.body;
  db.Lego.create(newLego, function(err, createdLego){
    if(err){return console.log(err)}
    res.json(createdLego);
  });
});

app.delete('/legos/:id', function(req, res){
  var legoId = req.params.id;
  db.Lego.findOneAndRemove({_id: legoId})
    .exec(function(err, deleted){
      res.json(deleted);
    });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("text app in running")
});
