var ejs = require('ejs');
//var db = require('../models/db.js');
var db = require('../models/db2.js');

exports.productDetail = function(req, res) {
	var proid = req.params.proid;
	console.log("proid = "+proid);
	getProductInfo(proid, function(err,result) {
		res.render('productDetail', {
			title : 'Ebay',
			show : result
		});
	});
}

function getProductInfo(proid, callback) {
	
	var sql = "select * from Product p, Seller s, Person pe where p.Product_id ="+ proid +" and p.Product_seller_id = s.Seller_id and s.Person_id = pe.Person_id";
	console.log("sql::"+sql);
	
	db.getConnection(function(err, connection) {
		var results = connection.query(sql, function(err, result) {
			if(err){
				console.log("err message: " + err.message);
			}else{
				callback(err, result);
				//console.log("info:"+callback);
				console.log("\nConnection closed...");
				connection.release();
			}
		});
		console.log("results is: " + results);
	});	
}

























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

