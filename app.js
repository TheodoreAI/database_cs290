// server starting
var express = require("express");
var app = express();

// passing the mysql from the dbcon.js file
var mysql = require('./dbcon');
// using CORS since I'm using static html index
var CORS = require("cors");
var path = require('path');

var port = '1975'
app.set('port', port)
app.use(express.json());
app.use(express.urlencoded({extended: false}));    // using the middleware in my app to recognize the incoming request object as a string/array
app.use(CORS());


app.use(express.static(path.join(__dirname, 'public')));

// The following code is what sets up requests/responses to the database using ajax
const getAllQuery = 'SELECT * FROM workout';
const insertQuery = "INSERT INTO workout (`name`, `reps`, `weight`, `unit`, `date`) VALUES (?, ?, ?, ?, ?)"; // a column with name
// simple_update
const updateQuery =
    "UPDATE workout SET name=?, reps=?, weight=?, unit=?, date=? WHERE id=? "; // insert new columns
const deleteQuery =
    "DELETE FROM workout WHERE id=?"; // deletes based on id
const dropTableQuery = "DROP TABLE IF EXISTS workout";
const makeTableQuery = `CREATE TABLE workout(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255) NOT NULL,
                        reps INT,
                        weight INT,
                        unit BOOLEAN,
                        date DATE);`;

// unit of 0 is lbs, unit of 1 is kgs
// make a function to resuse in the routes

app.get('/', (req, res) => {
    res.render('index');
})

const getAllData = () => {
    mysql.pool.query(getAllQuery, (res, err, rows, fields) => {
        if(err){
            next(err);
            return;
        }else{
            // object called rows: rows from db are an array [object1, object2,,..,]
        res.json({rows: rows});
        };
    });
};

// gets all the rows from the table
app.get('/', function (req, res, next) {
    var context = {};
    mysql.pool.query(getAllQuery,  (err, rows, fields) => {
        if (err) {
            next(err);
            return;
        }
        getAllData();
    });
});

// routes below:
app.post('/',  (req, res, next) => {
    var context = {};
    // object destructuring from the req.body
    // direct access to these properties
    var {name, reps, weight, unit, date} = req.body;
    mysql.pool.query(insertQuery, 
        [name, reps, weight, unit, date], 
        (err, result) =>{
        if (err) {
            next(err);
            return;
        }
        // make another query inside the callback fun
        getAllData();
    });
});

// app.delete('/', (req, res, next) => {
//     var context = {};
//     var { name, reps, weight, unit, date } = req.body;
//     // add the stuff from the post
//     mysql.pool.query(deleteQuery, [name, reps, unit, weight, unit, date], function (err, result) {
//         if (err) {
//             next(err);
//             return;
//         }
//         // check to see if the delete function works like this
//         // getAllData();
//         context.results = "Deleted " + result.changedRows + " rows.";
//         res.send(context)
//     });
// });

// ///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
// app.put('/', (req, res, next) => {
//     var context = {};
//     var { name, reps, weight, unit, date } = req.body;
//     mysql.pool.query(updateQuery,
//         [name, reps, unit, weight, unit, date],
//         function (err, result) {
//             if (err) {
//                 next(err);
//                 return;
//             }
//             getAllData();
//             context.results = "Updated " + result.changedRows + " rows.";
//             res.send(context)
//         });
// });

// navigate to this route before doing anything else to fill the table
// app.get('/reset-table', (req, res, next) => {
//     mysql.pool.query(dropTableQuery, function (err) {
//         mysql.pool.query(makeTableQuery, function (err) {
//             res.send('Table reset');
//         });
//     });
// });

// in case there is an error
app.use(function (req, res) {
    res.status(404);
    res.send('404');
    console.log(res.statusMessage)
});
// 
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500');
});



app.listen(app.get('port'), function () {
    console.log(`Express started on http://${process.env.HOSTNAME}:${app.get('port')};press Ctrl-C to stop.`);
});
module.exports = app;