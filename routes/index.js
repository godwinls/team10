var db = require('../models/db.js');

exports.homepage = function(req, res) {
	res.render('homepage', {
		title : 'Ebay'
	});
}