const mysql = require('mysql');
const dotenv=require('dotenv').config()
var connection  = mysql.createPool({
   
    connectionLimit :  process.env.mysql_connectionLimit ,
    port             : process.env.mysql_port,
    host            :  process.env.mysql_host,
    user            :  process.env.mysql_user,
    password        :  process.env.mysql_password,
    database        :  process.env.mysql_database
  });


  connection.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    if (connection) connection.release();
    console.log('Connected to the MySQL database');
});

module.exports = connection;