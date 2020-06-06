var mysql = require('mysql');
// making the table
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs290_estradma',
    password: '8792',
    database: 'cs290_estradma'
});
module.exports.pool = pool;


