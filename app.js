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


module.exports = app