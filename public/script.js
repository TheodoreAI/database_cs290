// beware of the format that we get the date back from mysql, format it using the value: yyyy:MM:DD

// defines the route where the requests are going:
const homeUrl = `http://flip1.engr.oregonstate.edu:1975/`;
// make form
var form = document.createElement('form');
var name1 = document.createElement("input");

var reps = document.createElement('input');
var weight = document.createElement('input');
var unit1 = document.createElement('input');
var unit2 = document.createElement('input');
var date = document.createElement('input');
var submit = document.createElement('input');

var Kgs = document.createTextNode("Kgs");
var lbs = document.createTextNode('Lbs');
// name
form.appendChild(name1);

name1.setAttribute('name', "name");
name1.setAttribute('type', 'text');
name1.setAttribute('id', 'nameID')

// reps
form.appendChild(reps);
reps.setAttribute('name', 'reps');
reps.setAttribute('type', 'number');
reps.setAttribute('id', 'repsID')

// weight
form.appendChild(weight);
weight.setAttribute('name', 'weight');
weight.setAttribute('type', 'number');
weight.setAttribute('id', 'weightID');

// unit

// labels

var nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'kgs');
nameLabel.appendChild(Kgs);

unit1.setAttribute('name', 'unit');
unit1.setAttribute('type', 'radio');
unit1.setAttribute('value', '0');
unit1.setAttribute('id', 'kgsID');
nameLabel.appendChild(unit1)
form.appendChild(nameLabel);


var nameLabel1 = document.createElement('label');
nameLabel1.setAttribute('for', 'lbs');
nameLabel1.appendChild(lbs);
nameLabel1.appendChild(unit2)
unit2.setAttribute('name', 'unit');
unit2.setAttribute('type', 'radio');
unit2.setAttribute('value', '1');
unit2.setAttribute('id', 'lbsID')
form.appendChild(nameLabel1);

// date
form.appendChild(date);
date.setAttribute('name', 'date');
date.setAttribute('type', 'date');
date.setAttribute('id', 'dateID');

form.appendChild(submit);
submit.setAttribute('value', 'submit');
submit.setAttribute('type', 'submit');

form.setAttribute('method', 'POST');
form.setAttribute('action', '/');
form.setAttribute('id', 'addForm');
document.body.appendChild(form);


var form = document.getElementById('addForm');
form.addEventListener('submit', function(event){
    var req = new XMLHttpRequest();
    // there might be something that needs to go here for the json.stringfy(etc)
    req.open('post', homeUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            document.getElementById('nameID').textContent = response.name;
        }else{
            console.log("Error in the network request: " + req.statusText);
        }});
   
    event.preventDefault();
})

const makeTable = (allRows) => {
    // makes the table
    // using the data from the database
    var table = createElement('table');
    table.setAttribute('id', 'workoutTable');
    // appends the headers
    table.appendChild(makeHeaderRow);
    document.body.appendChild(table);
    
    // add the table data cells each with the data for the specific id
    // add the buttons

};

const makeHeaderRow = () => {
    var headers = ['name', 'reps', 'weight', 'unit', 'date'];
   
  // remember that the the let lets you make a new lexical scope chained up to the previous scope
    for (let i = 0; i < headers.length; i++){
        var th = createElement('th');
        var thText = createTextNode(headers[i]);
        th.appendChild(thText);
    } return th
};

const makeRow = (rowData, headerRow = false) => {
    var tableEmpty = document.getElementById('workoutTable');
    var rowLength = tableEmpty.rows.length;
    var tr = tableEmpty.insertRow(rowLength);

    // double check the closure here
    for (let i in rowData){
        var td = createElement('td');
        var inputTd = createElement('input');
        td.appendChild(inputTd);
        td = tr.insertCell(i);
    }
};


const makeCell = (data) => {
    // create a table cell and add attributes to the table cell like
    // class
};


const makeInput = (data) => {
    // all the values from the row cells
    // creates the form input
};


const makeBtn = (name, txt)=>{

};

const makeRadioInputs =(name, val) => {

};

const disableInputs = () => {

};

const enableRow = (rowElem) => {


    
};
const toggleUpdateBtn = (rowElem) => {

};

const deleteTable = () => {
};

// function to get all the data from the database

const getData = async() => {
    // make a get request to the db
    var req = new XMLHttpRequest();
    req.open('get', homeUrl, true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            document.getElementById('nameID').textContent = response.name;
        } else {
            console.log("Error in the network request: " + req.statusText);
        }
    });
    // passing a JSON object to the table to build the rows
    JSON.parse(res.responseText);
    event.preventDefault();
}

// submit the add form and rebuild the table
// const form = document.querySelector('#addForm').onsubmit = async (event) => {

// };

// update or delete a row
// document.querySelector('#workoutTable').onclick = async (event) => {

// };

// // reset the table
// document.querySelector('#reset-table').onclick = async (event) => {

// };

(async () => {
    let tblData = await getData();
    makeTable(tblData);
})();

// form action goes to the path of of app.js


table.addEventListener('click', (event)=> {
    let target = event.target;
    

    // if its an update button send a PUT request to the server

    // if its a delete button then send a DELETE request to the server


    // if its a POST button then send a POST request to the server




    // if delete, deletes it then it makes it again

    // Makes the table again
});

// handlers for each of the event listeners: sends the stuff to the table and callbacks


// get the attributes to update: workout, reps, weight, unit, date
const onUpdate = () => {}

// get the ID and delete that row
const onDelete = () => {}





