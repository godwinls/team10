var mysql = require('mysql');

//node Mysql pool
module.exports = mysql.createPool({
	host:'localhost',
	user:'root',
	database:'mydb',
	password: 'root'
});
