var mysql = require('mysql');
var ejs = require('ejs');

//one connection
function getOneConnection(){
	var connection = mysql.createConnection({
		host    : 'localhost',
		user    : 'root',
		password: '',
		database: 'mydb'
	});
	return connection;
}

//get connection from pool
var max = 10;
var pool = [];
for(var i = 0; i < max; ++i){
	pool.push(getOneConnection());
}

var get = function(){
	if(pool.length > 0){
		return pool.pop();
	}else{
		return getOneConnection();
	}
}

var close = function(con){
	if(pool.length == max){
		con.end();
	}else{
		pool.push(con);
	}
}

function getConnectionFromPool(){
	return get();
}

var CONNECTION_TYPE = "one"; // one means getOneConnection(), pool means getConnectionFromPool()

function getConnection(type){
	if(type == "pool")
		return getConnectionFromPool();
	else if(type == "one")
		return getOneConnection();	
}


//var sqlQuery = "insert into Person (Person_first_name, Person_last_name, Person_zip, Person_address, Person_state, Person_city, Person_ssn, Person_email, Person_pass) values " +
//			   "('q', 'q', '95112', '53S 9th', 'CA', 'San Jose', '987654321', 'q@gmail.com', 'q')";
//insertData(sqlQuery);
function insertData(callback, sqlQuery){
	console.log("\nSQL Query::" + sqlQuery);
	var connection = getConnection(CONNECTION_TYPE);
	connection.query(sqlQuery, function(err, result){
		if(err)
			console.log("There is an error in creating");
		else{
			callback(err, result);
			console.log("creating successfully");
			connection.end();
			
		}		
	});
}

//var sqlQuery = "select Person_email from Person where Person_id = 1";
//fetchData(sqlQuery);
function fetchData(callback, sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection = getConnection(CONNECTION_TYPE);
	connection.query(sqlQuery, function(err, rows, fields){
		
		if(err){
			console.log("err message: " + err.message);
		}else{
			callback(err, rows);
			console.log(rows);
			console.log("\nConnection closed...");
			connection.end();
		}
	});
}

//var sqlQuery = "delete from Person where Person_id = 1";
//deleteData(sqlQuery);
function deleteData(callback, sqlQuery){
	console.log("\nSQL Query::" + sqlQuery);
	var connection = getConnection(CONNECTION_TYPE);
	connection.query(sqlQuery, function(err, result){
		if(err)
			console.log("There is an error in deleting");
		else{
			callback(err, result);
			console.log("deleting successfully");
			connection.end();
		}
	})
}

//var sqlQuery = "update category set cName = 'cinema' where categoryID = 2";
//updateData(sqlQuery);
function updateData(callback, sqlQuery){
	console.log("\nSQL Query::" + sqlQuery);
	var connection = getConnection(CONNECTION_TYPE);
	connection.query(sqlQuery, function(err, result){
		if(err)
			console.log("There is an error in updating");
		else{
			callback(err, result);
			console.log("updating successfully");
			connection.end();
		}
	})
}

exports.updateData = updateData;
exports.deleteData = deleteData;
exports.insertData = insertData;
exports.fetchData = fetchData;
