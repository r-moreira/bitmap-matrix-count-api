const { getResult } = require('./app')
const express = require('express');
const bodyParser = require('body-parser');

/*
** Starting the server and configuring the middleware.
*/
const app = express();
app.use(bodyParser.json());

/*
** Configuring the HTTP header to avoid 'CORS errors'.
*/
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET', 'POST');
		return res.status(200).json({});
	}
	next();
});

/*
** Here is where the vector and the matrix will be stored.
*/
let numbersList = null;
let matrix = null;

/*
** API initial route.
*/
app.get('/', (req, res, next) => {
	res.status(200);
	res.json({
		sendNumbersList: 'localhost:5050/send-list',
		sendMatrix: 'localhost:5050/send-list',
		seeTheResult: 'localhost:5050/get-result'
	});
});

/*
** This route returns the output of the algorithm in JSON format.
** The getResult function when called will return the algorithm's response.
*/
app.get('/get-result', (req, res, next) => {
	res.status(200)
	res.json({
		result: getResult(numbersList, matrix)
	});
});

/*
** This route receives a vector of numbers, eg: [0, 2, 2, 5, 31, 12, 61];
** A check is also made to see if the received value is a list of numbers,
** if not, an error is returned.
*/
app.post('/send-list', (req, res, next) => {
	numbersList = req.body;
	isValid = true;

	for (i = 0; i < numbersList.length; i++)
		if (isNaN(numbersList[i]))
			isValid = false;
	if (isValid && Array.isArray(numbersList)) {
		res.status(201)
		res.json({
			status: 'Vector was created successfully!',
			numbersList: numbersList,
			alsoSendMatrix: 'localhost:5050/send-matrix',
			seeTheResult: 'localhost:5050/get-result'
		});
	} else {
		const error = new Error('Bad Request. Invalid numbers list. Expected: [0, 1, 2,...,15]');
		error.status = 400;
		next(error);
	}
});

/*
** This route receives an array of numbers, eg: [[2, 4], [2 4]],
** A check is also made to see if the received value is an array of numbers,
** if not, an error will be returned.
*/
app.post('/send-matrix', (req, res, next) => {
	matrix = req.body;
	let isValid = true;

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++)
			if (isNaN(matrix[i][j]))
				isValid = false;
	}
	if (isValid && Array.isArray(matrix)) {
		res.status(201)
		res.json({
			status: 'Matrix was created successfully!',
			matrix: matrix,
			sendNumbersList: 'localhost:5050/send-list',
			seeTheResult: 'localhost:5050/get-result'
		});
	} else {
		const error = new Error('Bad Request. Invalid matrix. Expected format: [[x, y ,z], [x, y, z]]');
		error.status = 400;
		next(error);
	}
});


/*
** If none of the routes are found an error will be generated.
*/
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

/*
** Other errors are handled here by sending a corresponding JSON error message
*/
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
