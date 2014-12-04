var db = require('../models/db.js');

exports.showUser = function(req, res){
	var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
	var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
		+ req.session.user.Person_id;
	var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
		+ req.session.user.Person_id;
	
	db.fetchData(function(err,presult){
		if (err)
			throw err;
		else{
			db.fetchData(function(err,sresult){
		                if (err)
			                throw err;
		                else{
		                	db.fetchData(function(err,bresult){
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
}

exports.showBuyHistory = function(req, res){
	var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
	var getBuyInfo = "SELECT * FROM TransHistory, Product, Customer WHERE Customer_id = TransHistory_Buyer_id AND TransHistory_Product_id = Product_id AND Customer.Person_id = "
		+ req.session.user.Person_id;
	
	db.fetchData(function(err,presult){
		if (err)
			throw err;
		else{
		    db.fetchData(function(err,bresult){
		    	if (err)
		    		throw err;
				else{
					res.render('buyHistory', {
						title: 'Buy History',
				        user: req.session.user,   
				        presult: presult,
		                bresult: bresult
			        });
			    }},getBuyInfo);
	        }    	    
	},getUserInfo);
}

exports.showSellHistory = function(req, res){
	var getUserInfo = "SELECT * FROM Person, Seller WHERE Person.Person_id = Seller.Person_id AND Person.Person_id = "+ req.session.user.Person_id;
	var getSellInfo = "SELECT * FROM TransHistory, Product, Seller WHERE Seller_id = TransHistory_Seller_id AND TransHistory_Product_id = Product_id AND Seller.Person_id = "
		+ req.session.user.Person_id;
	
	db.fetchData(function(err,presult){
		if (err)
			throw err;
		else{
		    db.fetchData(function(err,bresult){
		    	if (err)
		    		throw err;
				else{
					res.render('sellHistory', {
						title: 'Sell History',
				        user: req.session.user,   
				        presult: presult,
		                sresult: bresult
			        });
			    }},getSellInfo);
	        }    	    
	},getUserInfo);
}