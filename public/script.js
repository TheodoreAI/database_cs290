const homeUrl = "http://flip1.engr.oregonstate.edu:1969/";

// I am going to start with an empty database and add things
// make a table if there is stuff in there already with this code

var req = new XMLHttpRequest();
req.open('GET', '/database', true);
req.setRequestHeader('Content-Type', 'application/json')
req.addEventListener('load', function () {
    if (req.status >= 200 && req.status < 400) {
        // alert('No pasa la data');
        makeTable(JSON.parse(req.responseText));

    } else {
        alert('There is something wrong with the GET' + req.status);
    }
});
req.send(null);


// the reset-table button doesn't erase the data 
var resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset-Table';
resetButton.setAttribute('id', 'resetButton');
document.body.appendChild(resetButton)


document.getElementById('resetButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    req.open('GET', homeUrl + 'reset-table', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            alert('This is working');
            return;
        }
    })
    req.send();
})


document.getElementById('addWorkout').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    let body = {
        name: null,
        reps: null,
        weight: null,
        unit: null,
        date: null
    };
    body.name = document.getElementById('nameId').value;
    body.reps = document.getElementById('repsId').value;
    body.reps = document.getElementById('repsId').value;
    body.weight = document.getElementById('weightId').value;
    if (document.getElementById('unit0').checked) {
        body.unit = 0;
    } else {
        body.unit = 1;
    }
    body.date = document.getElementById('dateId').value;
    // for troubleshooting:
    if (body.name == null) {
        alert('There must be an input workout.');
        event.preventDefault();
        return;
    }
    // make sure that the top code works
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            // make the table here
            // delete if there is a table already
            if (document.getElementById('workoutTable') != null) {
                // this has to call a function that deletes 
                deleteNode(JSON.parse(req.responseText));
            } else {
                makeTable(JSON.parse(req.responseText));
                // alert(req.responseText)
                alert('The request was processed right: add the table');
            }

        } else {
            alert('Error in the post request');
        }
    });
    req.send(JSON.stringify(body));
    event.preventDefault();
});


// deletes the tbody and builds it again, if submit form
const deleteNode = (array) => {
    // save the old table node
    var table = document.getElementById('workoutTable');
    var oldBody = document.getElementById('bodyId');
    table.removeChild(oldBody);
    // makes the table again
    makeBody(array, table);
}



function makeTable(allRows) {
    var headers = ['Name', 'Reps', 'Weight', 'Unit', 'Date'];
    // makes the table
    // using the data from the database
    var table = document.createElement('table');
    table.setAttribute('id', 'workoutTable');
    // appends the headers

    var tr = table.insertRow(-1);
    // add the table data cells each with the data for the specific id
    // add the buttons

    // remember that the the let lets you make a new lexical scope chained up to the previous scope
    for (let i = 0; i < headers.length; i++) {
        var th = document.createElement('th');
        var thText = document.createTextNode(headers[i]);
        th.appendChild(thText);
        tr.appendChild(th);
    }
    makeBody(allRows, table);
};

function makeBody(array, table) {
    // This function makes the body of the table:
    if (table == null) {
        alert("there is something wrong with the table");
        return;
    }
    if (!Array.isArray(array)) {
        // alert('This is not an array');
    }
    var tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'bodyId');
    for (let element = 0; element < array.length; element++) {
        var e = array[element];
        (function (ele) {

            var row = document.createElement('tr');
            var name = document.createElement('td');
            var reps = document.createElement('td');
            var weight = document.createElement('td');
            var unit = document.createElement('td');
            var date = document.createElement('td');


            var edit = document.createElement('td');

            var delBtn = document.createElement('button');
            delBtn.setAttribute('id', 'deleteBtn');

            // attempt to set the onclick function

            row.appendChild(delBtn);
            delBtn.innerHTML = 'Delete';

         
            row.setAttribute('id', ele['id']);
            row.appendChild(name);
            name.innerHTML = ele["name"];
            row.appendChild(reps);
            reps.innerHTML = ele['reps'];
            row.appendChild(weight);
            weight.innerHTML = ele['weight'];
            row.appendChild(unit);
            if (ele["unit"] == 1) {
                unit.innerHTML = 'lbs';
            } else {
                unit.innerHTML = 'kgs';
            }
            row.appendChild(date);
            if (ele['date'] != null) {
                date.innerHTML = ele['date'].substring(0, 10);
            }
            tbody.appendChild(row);

            delBtn.onclick = function () {
                   deleteRow(ele['id']);
            };

        })(e);
        table.appendChild(tbody);
        document.body.appendChild(table);
      
    }
}


// document.getElementById('addForm').addEventListener('click', function (event) {
//     // Two jobs: 
//     // 1. needs to delete the row from client side
//     // calls the deleteRow function
//     var row = document.getElementById('rowId');
//     var tbody = document.getElementById('bodyId');
//     tbody.removeChild(row);
//     deleteRow(row, event);
// });



function deleteRow(rowId){
    // 2. delete the data from the database 
    var req = new XMLHttpRequest();
    payload = {
        id: 'rowId'
    }
    alert('Its in the delete!');
    req.open('DELETE', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            // if the Delete request goes through effectively
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}