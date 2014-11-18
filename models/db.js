/**
 * YZ
 */
var mysql = require('mysql');

//node Mysql pool
module.exports= mysql.createPool({
	connectionLimit : 20,
	host:'localhost',
		user:'root',
		database:'mydb',
		password: '5245193'
	});