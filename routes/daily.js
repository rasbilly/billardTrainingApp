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
    html += '<style>tr:hover {background-color:#dcdcdc;} ' +
        '@media only screen and (max-device-width:868px){table {border-collapse: collapse; width: 100%;}}' +
        '@media only screen and (min-device-width:869px){table {border-collapse: collapse; width: 60%;}}' +
        'th, td {\n' +
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
                if (user.Gruppe === gr) {
                    console.log("2: " + user.Name + " -- " + user.Gruppe);
                    console.log("userVetretung:" + user.Vertretung + ":");
                    if (user.Vertretung != '') {
                        console.log("achtung");
                        tableHtml += "<tr id='zeile" + i + "'><td id='z" + i + "1'>" + user.Vertretung +
                            "</td><td id='z" + i + "2'></td><td id='z" + i + "3'>" + user.Status + "</td></tr>";

                    } else if (user.Status === 'frei') {
                        tableHtml += "<tr id='zeile" + i + "' style='background-color:#BEF781'><td id='z" + i + "1'><input id='newName' placeholder='Neuen Namen eingeben'>" +
                            "</td><td id='z" + i + "2'><button onclick='setNewName(" + i + ")'>Bestätigen</button></td><td id='z" + i + "3'>" + user.Status + "</td></tr>";
                    } else if (user.Status === 'belegt') {
                        tableHtml += "<tr id='zeile" + i + "'><td id='z" + i + "1'>" + user.Name +
                            "</td><td id='z" + i + "2'><button onclick='freigeben(" + i + ")'>Termin Freigeben</button></td><td id='z" + i + "3'>" + user.Status + "</td></tr>";

                    }


                    console.log("Status: " + user.Status + "von User: " + user.Name);
                }

            }
        } catch (error) {
        }
    }
    tableHtml += "</table><br>";
    return tableHtml;
}
