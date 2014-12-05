var ejs = require('ejs');
//var db = require('../models/db.js');
var db = require('../models/db2.js');

exports.toshoppingcart = function(req,res){
	res.render('shoppingCart', {
		title : 'Ebay'
	});
}
