var ejs = require('ejs');
var db = require('../models/db.js');


exports.signIn_admin = function(req, res) {
	res.render('signIn_admin', {
		title : 'Ebay'
	});
	
}

exports.afterSignIn_admin = function(req, res) {
	res.render('homepage_admin', {
		title : 'Ebay'
	});
	
}