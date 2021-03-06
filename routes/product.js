var ejs = require('ejs');
var db = require('../models/db.js');

function getCategory(callback) {
	var show = "select * from category";
	console.log("Query is: " + show);
	db.fetchData(function(err, result) {
		if (err)
			throw err;
		else {
			callback(result);
		}
	}, show);
}
//var productDetail=
//function getProduct(callback) {
//	db.fetchData(function(err, result) {
//		if (err)
//			throw err;
//		else {
//			callback(result);
//		}
//	}, getProductDetail);
//	
//}


exports.list = function(req,res){
	console.log("in list");
	var cid = req.params.cid;
	var query = "select * from Product where Product_category_id = "+cid;
	console.log("Query is: " + query);
	db.fetchData(function(err, result){
		if(err)
			throw err;
		else{
			console.log(result);
			//console.log(JSON.stringify(result));
			res.send(result);	
		}
	}, query);
}

exports.toProduct = function(req, res) {
	var session = req.session;
	console.log(JSON.stringify(session));
	
	var getUser = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
	var getProductDetail ="SELECT * FROM Product WHERE Product_id="+req.param("pid");
	var getSeller = "SELECT * FROM person, seller where person.Person_id="+req.param("pid");
	var getCategoryDetail = "SELECT Category_name FROM category where Category_id="+req.param("pid");
	console.log("Query is: " + getUser);
	console.log("Query is: " + getProductDetail);
	
			db.fetchData(function(err, result) {
			
					req.session.detail = result[0];
				//	console.log("Query is aaaaaaaaaaaaaaaaaaaaaa: " + req.session.detail);
				
			}, getProductDetail);
		
	//console.log("Query is aaaaaaaaaaaaaaaaaaaaaa: " + productDetail[0]);
	db.fetchData(function(err, result) {
	
		req.session.user = result[0];
			//	req.session.detail = productDetail[0];
			//	console.log(req.session.user);
			//	console.log(req.session.detail);
				getCategory(function(result) {
					res.render('productPage', {
						title : 'Ebay',
						show : result
					});
				});				

	}, getUser);
}

exports.toHomepage = function(req, res) {
	getCategory(function(result) {
		res.render('homepage', {
			title : 'Ebay',
			show : result
		});
	});
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

