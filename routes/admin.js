var ejs = require('ejs');
var db = require('../models/db.js');


exports.signIn_admin = function(req, res) {
	res.render('signIn_admin', {
		title : 'Ebay'
	});
	
}

exports.afterSignIn_admin = function(req, res) {
	var adminId = "admin";
	var adminPass = "ebayadmin";
	var id = req.param("id");
	var pass = req.param("pass");
	var session = req.session;
	
	console.log(JSON.stringify(session));
	req.session.admin = {
			ID : req.param("id"),
			password : req.param("pass")
	};
	console.log(JSON.stringify(session));
	
	if(id == adminId && pass == adminPass) {
		res.render('homepage_admin', {
			title : 'Ebay'
		});
	}else {
		console.log("wrong admin sign in info....");
		res.render('signIn_admin', {
			title : 'Ebay'
		});
	}		
}

exports.signOut_admin = function(req, res) {
	req.session.admin = null;
	res.render('signIn_admin', {
		title : 'Ebay'
	});
}

exports.toAdminHome = function(req, res) {
	res.render('homepage_admin', {
		title : 'Ebay'
	});
}

function getDataset(callback) {
	var show = "select * from Person";
	console.log("Query is: " + show);
	db.fetchData(function(err, result) {
		if (err)
			throw err;
		else {
			callback(result);
		}
	}, show);
}

exports.listPerson = function(req, res) {
	getDataset(function(dataset) {
		res.render('listPerson_admin', {
			title : 'Ebay',
			show : dataset
		});
	});
}