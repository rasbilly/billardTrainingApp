var express = require('express');
var router = express.Router();

var JsonDB = require('node-json-db');
var database = new JsonDB("data/userDataDB", true, false);
var db2 = new JsonDB("data/settingsDataDB", true, false);


/* GET users listing. */
router.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    database.reload();
    db2.reload();

    var html = "";
    try {
        var currentWeek = db2.getData("/currentWeek");
        var nextDate = db2.getData("/nextDate");
    } catch (e) {
        var currentWeek = "Fehler";
        var nextDate = "Fehler";
    }


    html += '<p>Nächstes Training am: <span id="nextDate">';
    html += nextDate;
    html += '</span></p><p>Gruppe: <span id="nextGroup"><b>';
    html += currentWeek;
    html += '</b></span></p><br><p>Tabelle vom Gruppenmitglieder und Funktion zur Platzvergabe</p><br>\n';
    html += table(currentWeek);
    html += '<p>evtl. Aktuelle Änderungen</p>'
    html += '<style>tr:hover {background-color:#dcdcdc;} table {border-collapse: collapse; width: 50%;}th, td {\n' +
        '  padding: 8px;\n' +
        '  text-align: left;\n' +
        '  border-bottom: 1px solid #ddd;\n' +
        '} </style>';

    res.send(html);
});

module.exports = router;

function table(gr) {
    console.log("start Table: " + gr);
    var tableHtml = "";
    tableHtml += "<table><tr><th>Name</th><th>Aktion</th><th>Satus</th></tr>";
    for (var i = 0; i <= 100; i++) {
        try {
            var user = database.getData("/" + i);
            if (user.Name != undefined) {
                if (user.Gruppe == gr) {
                    console.log("2: " + user.Name + " -- " + user.Gruppe);
                    tableHtml += "<tr id='zeile"+i+"'><td id='z"+i+"1'>" + user.Name +
                        "</td><td id='z"+i+"2'><button onclick='freigeben("+i+")'>(TODO) Termin Freigeben</button></td><td id='z"+i+"3'>" + user.Status + "</td></tr>";
                }
                if(user.Status == 'frei'){
                    document.getElementById("z" + i + "1").innerHTML = "<input placeholder='Neuen Name eingeben'> </input>";
                    document.getElementById("z" + i + "2").innerHTML = "<button>Bestätigen</button>";
                    document.getElementById("z" + i + "3").innerHTML = "frei";
                }
            }
        } catch (error) {
        }
    }
    tableHtml += "</table><br>";
    return tableHtml;
}
