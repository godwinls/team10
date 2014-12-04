var ejs = require('ejs');
//var db = require('../models/db.js');
var db = require('../models/db2.js');

exports.toEditEmail = function(req, res) {
	res.render('editEmail', {
		title : 'Ebay'
	});
}