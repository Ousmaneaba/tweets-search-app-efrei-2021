'use strict';

const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const promBundle = require("express-prom-bundle");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use("/((?!ref))*", promBundle({includePath: true}));


app.get('/', (req, res) => {
	req.setTimeout(500000);

	res.render('index');
});

app.get('/tweets', (req, res) => {

	req.setTimeout(500000);

	if(req.query.message == undefined || req.query.message == null || req.query.message == '' ){
		res.render('index');
	}
	else{

		let timestamp = new Date().getTime();
		let fileName = timestamp + "_tmp.txt";		

		let fileProcess = spawn('touch', [fileName]);

		fileProcess.on('close', (code) => {

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
	
					spawn('rm', [fileName]);
	
				});
	
			  });
	
			  scriptProcess.on('error', (err) => {
				console.log("AN ERROR OCCURED WHILE FETCHING TWEETS")
				console.log(err)
				res.send(500)
			  });

		});

		fileProcess.on('error', (err) => {
			console.log("AN ERROR OCCURED WHILE CREATING TMP FILE")
			console.log(err)
			res.send(500)
		  });

	}

});


module.exports = app