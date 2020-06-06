// server starting
var express = require("express");
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
// passing the mysql from the dbcon.js file
var mysql = require('./dbcon.js');
// using CORS since I'm using static html index
var CORS = require("cors");
var path = require('path');

// set the engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// port stuff and using express on the app
var port = '1969'
app.set('port', port)
app.use(express.json());
app.use(express.urlencoded({extended: true}));    // using the middleware in my app to recognize the incoming request object as a string/array
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



// This function will return an array of objects 
// which corresponds to the rows in the database.

// show the home page
app.get('/', (req, res)=>{
    res.render('home');
})


// collect the data from the database
function getAllData(req, res, next){
    mysql.pool.query(getAllQuery, (err, rows, fields) => {
        if(err){
            console.log("there was an error"+ err);
            return;
        }
        // object called rows: rows from db are an array [object1, object2,,..,]
        // sends it back to the client-side
       
        res.type('application/json');
        res.send(rows);
    });
};
// gets all the rows from the database and sends them to the client 
app.get('/database', (req, res, next) => {
        getAllData(req, res, next);
});

// routes below:
app.post('/',  (req, res, next) => {
    // object destructuring from the req.body
    // direct access to these properties
    var context = {};
  
    mysql.pool.query(insertQuery, 
        [req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date],
        (err, result) =>{
        if (err) {
            console.log(req.body);
            console.log("there is an error with this POST")
            return next(err);     
        }
        // make another query inside the callback fun
        getAllData(req, res, next);
    });
});
app.delete('/', (req, res, next) => {
    var context = {};
    var { name, reps, weight, unit, date } = req.body;
    // add the stuff from the post
    mysql.pool.query(deleteQuery, [name, reps, unit, weight, unit, date], function (err, result) {
        if (err) {
            next(err);
            return;
        }
        // check to see if the delete function works like this
        // getAllData();
        // context.results = "Deleted " + result.changedRows + " rows.";
        getAllData(req, res, next);
    });
});

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
app.get('/reset-table', (req, res, next) => {
    mysql.pool.query(dropTableQuery, function (err) {
        mysql.pool.query(makeTableQuery, function (err) {
            res.send('Table reset');
        });
    });
});

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
app.listen(port, function () {
    console.log(`Express started on http://${process.env.HOSTNAME}:${port};press Ctrl-C to stop.`);
});

module.exports = app;