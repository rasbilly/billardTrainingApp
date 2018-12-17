var express = require('express');
var router = express.Router();
var app = require('../app');
var JsonDB = require('node-json-db');
var db = new JsonDB("data/userDataDB", true, false);
var db2 = new JsonDB("data/settingsDataDB", true, false);

var id = userIdStart();


router.get('/', function (req, res) {

    res.send("gut0");
});

function userIdStart() {
    db.reload();
    var z = 0;
    for (var i = 0; i <= 200; i++) {
        try {
            var user = db.getData("/" + i);
            if (user != undefined) {
                z = i + 1;
            }
        } catch (error) {
        }
    }
    console.log("User ID startet bei:" + z);
    return z;
}

//Add User
router.get('/addUser/:name/:groupId', function (req, res) {
    var name = req.params.name;
    id += 1;
    for (var i = 0; i <= id + 1; i++) {
        try {
            var user = db.getData("/" + i);
            if (user.Name.toLowerCase() == name.toLowerCase()) {
                res.status(500).send(name + " schon belegt. Schreibe Vor und Nachname.");
                id += 1;
                return;
            }
        } catch (error) {
        }
    }

    var groupId = req.params.groupId;
    var obj = {"Name": name, "Gruppe": groupId, "Status": "", "Vertretung": ""};
    var str = JSON.stringify(obj);
    db.push("/" + id, obj);
    db.reload();
    res.send(name + " wurde erfolgreich in Gruppe " + groupId + " erstellt.");
});


//Gruppe wechseln
router.get('/changeGroup/:name/:newGroup', function (req, res) {
    var name = req.params.name;
    var newGr = req.params.newGroup;
    for (var i = 0; i <= id + 1; i++) {
        try {
            var user = db.getData("/" + i);
            if (user.Name.toLowerCase() == name.toLowerCase()) {
                var name = user.Name;
                var gruppe = user.Gruppe;
                var obj = {"Name": name, "Gruppe": gruppe, "Status": status, "Vertretung": vertr};
                var str = JSON.stringify(obj); //TODO
                db.push("/" + i, obj);
                res.send(name + " wurde erfolgreich in Gruppe " + newGr + " verschoben.");
                return;
            }
        } catch (error) {
        }
    }
    res.status(500).send("Gruppe von " + name + " wurde NICHT geändert!");
});


//Delete User
router.get('/deleteUser/:name', function (req, res) {
    var name = req.params.name;
    for (var j = 0; j <= id + 1; j++) {
        try {
            var te = db.getData("/" + j);
            if (te.Name.toLowerCase() == name.toLowerCase()) {
                db.delete("/" + j);
                res.send(name + " wurde erfolgreich entfernt.");
                return;
            }
        } catch (error) {
        }
    }
    res.status(500).send(name + " wurde NICHT gefunden!");
});


//changeWeek
router.get('/changeWeek/:newWeek', function (req, res) {
    var newWeekStr = req.params.newWeek;
    try {
        db2.push("/currentWeek", newWeekStr);
        res.send("Aktuelle Woche wurde auf " + newWeekStr + " gesetzt.");
        return;
    } catch (error) {
    }
    res.status(500).send("Fehler - Woche konnte NICHT geändert werden!");
});


//changeState //TODO testen + ändern
router.get('/changeState/:id/:newName', function (req, res) {
    console.log("geöffnet --------------------" + req.params.id +" und " + req.params.newName);
    let id = req.params.id;
    try {
        let user = db.getData("/" + id);
        if (req.params.newName === 'null') {
            console.log("1");
            if (user.Status === 'belegt') {
                console.log("2");
                db.push("/" + id, {"Name": user.Name, "Gruppe": user.Gruppe, "Status": "frei", "Vertretung": ""});
                //Seite neu laden
                res.send("Antwort belegt auf frei");

            } else if (user.Status === 'frei') {
                console.log("3");
                db.push("/" + id, {
                    "Name": user.Name,
                    "Gruppe": user.Gruppe,
                    "Status": "belegt",
                    "Vertretung": req.params.newName
                });
                //Seite neu laden
                res.send("Antwort frei auf belegt");
            }
            db.reload();
        }else{
            console.log("Vertretung eintragen: "+ req.params.newName);
            db.push("/" + id, {"Name": user.Name, "Gruppe": user.Gruppe, "Status": "belegt (Vertretung)", "Vertretung": req.params.newName});
            res.send("true");
        }
    } catch (e) {
        console.log("!! changeState");
        res.send("Fehler -- changeState");
    }
});

module.exports = router;








