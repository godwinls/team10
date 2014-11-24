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
	if(id == adminId && pass == adminPass) {
		res.render('homepage_admin', {
			title : 'Ebay'
		});
	}else {
		res.render('signIn_admin', {
			title : 'Ebay'
		});
	}	
}