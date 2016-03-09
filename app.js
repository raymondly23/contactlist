'use strict'

const PORT = 8888;
const contactsFilename = './contacts.json'

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs')
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
	var indexPath = path.join(__dirname, 'index.html');
	res.sendFile(indexPath);
});

app.get('/contacts', function(req, res){
	fs.readFile(contactsFilename, function(err, data){
    var obj = JSON.parse(data);
		res.send(obj);
	});
});

app.post('/contacts', function(req, res){
	fs.readFile(contactsFilename, function(err, data){
    var JSONArray = JSON.parse(data);
    JSONArray.push(req.body)
		fs.writeFile(contactsFilename, JSON.stringify(JSONArray), function(err){
			console.log('MF is in the JSON')
			res.send("workworkworkworkworkwork");
    });
  });
});

app.delete('/contacts/:index', function(req, res){
  fs.readFile(contactsFilename, function(err, data){
    data = JSON.parse(data);
    data.splice(req.params.index, 1);
    fs.writeFile(contactsFilename, JSON.stringify(data), function(err, data){
      console.log('Shit got DELETED!')
    });
  res.send('DELETED');
  });
});

app.put('/contacts/:index', function(req, res){
  fs.readFile(contactsFilename, function(err, data){
    data = JSON.parse(data);
   console.log(data[req.params.index])
    res.send('EDITED')
  });
});

var server = http.createServer(app);

server.listen(PORT, function(){
	console.log(`Server listening on port ${PORT}`)
});