'use strict';

const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));


app.get('/', (req, res) => {
	res.render('index');
});

app.get('/tweets', (req, res) => {

	if(req.query.message == undefined || req.query.message == null || req.query.message == '' ){
		res.render('index');
	}
	else{

		let timestamp = new Date().getTime();
		let fileName = timestamp + "_tmp.txt";
		let scriptProcess = spawn('python', ['tweets-tf-idf.py', req.query.message, fileName]);
		let result = "error";

		 scriptProcess.on('close', (code) => {

		  	fs.readFile(fileName, 'utf8', function (err,data) {

		  	if(err != null){
		  	  res.send(500)
		  	}
		  	else{
		  	  result = data
              res.render('index', {message: req.query.message, result: result});
		  	}

			});

		  });

		  scriptProcess.on('error', (err) => {
		    console.log("AN ERROR OCCURED")
		    console.log(err)
		    res.send(500)
		  })

	}

});


module.exports = app