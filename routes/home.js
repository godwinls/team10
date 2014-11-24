var ejs = require('ejs');
var mysql = require('./mysql');

exports.signUp = function(req, res) {
	res.render('signUp', {
		title : 'Express'
	});
}

exports.afterSignUp = function(req, res) {
	var fname = req.param("firstname");
	var lname = req.param("lastname");
	var email = req.param("email");
	var pass = req.param("pass");
	var rpass = req.param("rpass");
	var addr = req.param("address");
	var state = req.param("state");
	var city = req.param("city");
	var zip = req.param("zip");
	var ssn = req.param("ssn");
	//if(pass == rpass && pass.length >= 6) {
		var userInfo = "insert into Person (Person_first_name, Person_last_name, Person_zip, Person_address, Person_state, Person_city, Person_ssn, Person_email, Person_pass) values ('"
				+ fname + "', '" + lname + "', '" + zip + "', '" + addr + "', '" + state + "', '" + city + "', '" + ssn + "', '" + email + "', '" + pass + "')";
		console.log("Query is: " + userInfo);
		if(fname.length > 0 && lname.length > 0
				&& email.length > 0
				&& pass.length >=6 ) {
			mysql.insertData(function(err, result) {
				if (err)
					throw err;
				else {
					res.render('signIn', {
						title : 'Express'
					});
				}
			}, userInfo);
		} else {
			console.log("invalid sign up information.")
			res.render('signUp', {
				title : 'Express'
			});
		}
	//}else {
//		console.log("passwords are not the same.")
//		res.render('signUp', {
//			title : 'Express'
//		});
//	}	
}

exports.signIn = function(req, res) {
	res.render('signIn', {
		title : 'Express'
	});
}

exports.afterSignIn = function(req, res) {
	var session = req.session;
	console.log(JSON.stringify(session));
	var getUser = "select * from Person where (Person_email, Person_pass) = ('"
		+ req.param("email") + "', '" + req.param("pass") + "')";
	console.log("Query is: " + getUser);
	
	mysql.fetchData(function(err, result) {
		if (err)
			throw err;
		else {
			console.log("result = "+ JSON.stringify(result));
			if (result.length > 0) {
				req.session.user = result[0];
				console.log("valid login~~");
				res.render('homepage', {
					title : 'Express'
				});
			}else {
				console.log("invalid login");
				ejs.renderFile('./views/failSignIn.ejs', function(err,
						result) {
					if (!err) {
						res.end(result);
					} else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}	
		}
	}, getUser);
}