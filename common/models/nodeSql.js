var mysql = require('mysql');
var http = require('http');
var dbConfig = require('./dbconfig.json');
var express = require('express');
var app = require('../../server/server');
app.use(express.bodyParser());
var connection = mysql.createConnection(
	{
		user: dbConfig.user,
		password: dbConfig.password,
		host: dbConfig.host,
		database: dbConfig.database
	},
	app.get('/nodeSqlfindCall', function (req, res) {

		connection.query("SELECT * from CustomerInfo.customer",

			function (err, result) {
				if (err) {
					console.log('inside error execute');
					console.error(err.message);
					doRelease(connection);
					return;
				}
				res.send('Data from DataBase call: \n' + JSON.stringify(result));
				console.log('Data from DataBase call: \n' + JSON.stringify(result));
			});
	}),
	app.post('/nodeSqlInsertCall', function (req, res) {

        var body = req.body;
		console.log('--------------------' + JSON.stringify(body));
		var insert = [];

		insert.push([
			firstName = body.firstName,
			lastName = body.lastName,
			middleName = body.middleName,
			accountNum = body.accountNum,
			socialSecurity = body.socialSecurity,
			addressLine1 = body.addressLine1,
			addressLine2 = body.addressLine2,
			city = body.city,
			postalCode = body.postalCode,
			Country = body.Country,
			accountType = body.accountType,
			openDt = body.openDt,
			closeDt = body.closeDt
		]);

		connection.query("INSERT INTO CustomerInfo.customer VALUES ?", [insert],

			function (err, result) {
				if (err) {
					console.log('inside error execute');
					console.error(err.message);
					doRelease(connection);
					return;
				}
				res.send('Data from DataBase call: \n' + 'Insertion Successful');
				console.log('Data from DataBase call: \n' + JSON.stringify(result));
			});
	}),
	app.delete('/nodeSqlDeleteCall', function (req, res) {

        var body=req.body;
        console.log('--------------------' + JSON.stringify(body));
        var remove=[];

		remove.push([
		   accountNum=body.accountNum
		]);

		
		connection.query("DELETE FROM CustomerInfo.customer WHERE accountNum = ?",[remove],

			function (err, result) {
				if (err) {
					console.log('inside error execute');
					console.error(err.message);
					doRelease(connection);
					return;
				}
				res.send('Data from DataBase call: \n' +'Deletion Successful');
				console.log('Data from DataBase call: \n' + JSON.stringify(result));
			});
	}));

function doRelease(connection) {
	connection.release(
		function (err) {
			if (err) {
				console.error(err.message);
			}
		});
};
