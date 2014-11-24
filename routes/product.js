/**
 * New node file
 */
var db = require('../models/db.js');

function Product(product){
	this.id = product.name;
	this.price = product.price;
	this.type = product.type;
	
	
}

exports.showAll = function(req, res){
   var getall = "SELECT Categorycol From Category";
   db.fetchData(function(err,result){
	   if(err)
		   throw err;
	   else {
		   res.render('homepage',{
			   title: 'Ebay'
		   });
	   }
   });
}