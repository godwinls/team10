var ejs = require('ejs');
var db = require('../models/db2.js');
var db1 = require('../models/db.js');


exports.toEditEmail = function(req, res) {
	res.render('editEmail', {
		title : 'Ebay'
	});
}

exports.editEmail = function(req, res) {
	var uid = req.session.user.Person_id;
	console.log("user id is::"+uid);
	var newE = req.param("newemail");
	var rNewE = req.param("retypeemail");
	console.log("new email is::"+newE+"; retype email is::"+rNewE);
	if(newE == rNewE && newE.length > 0) {
		var sql = " update Person set Person_email = '" + newE + "' where Person_id =" + uid;
		console.log("sql::" + sql);
		db.getConnection(function(err, connection) {
			var query = connection.query(sql, function(err, results) {
				if(err){
					console.log("err message: " + err.message);
				}else{
					//callback(err, results);
					console.log("info:"+results);
					console.log("\nConnection closed...");
					connection.release();
					req.session.user.Person_email = newE;
					console.log("~~in session the email is::" + req.session.user.Person_email);

					
					var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
					var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
						+ req.session.user.Person_id;
					var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
						+ req.session.user.Person_id;
					
					db1.fetchData(function(err,presult){
						if (err)
							throw err;
						else{
							db1.fetchData(function(err,sresult){
						                if (err)
							                throw err;
						                else{
						                	db1.fetchData(function(err,bresult){
								                if (err)
									                throw err;
								                else{
									                res.render('myAccount', {
							                        title: 'My Account',
								                    user: req.session.user,   
								                    presult: presult,
						                            sresult: sresult,
						                            bresult: bresult
							                        });
							        }},getBuyInfo);
					        }},getSellInfo);	    
					};	    
					},getUserInfo);
					
//					res.render('myAccount', {
//						title : 'Ebay'
//					});
				}
			});
		});
	}else{
		res.render('checkEditEmail', {
			title : 'Ebay'
		});
	}

}