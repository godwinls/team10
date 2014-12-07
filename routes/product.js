var ejs = require('ejs');
<<<<<<< HEAD
var db = require('../models/db.js');
=======
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
























>>>>>>> refs/remotes/origin/master

<<<<<<< HEAD
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
=======
function Product(product){
	this.id = product.name;
	this.price = product.price;
	this.type = product.type;		
>>>>>>> refs/remotes/origin/master
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

