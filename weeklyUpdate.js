const cron = require("node-cron");
var JsonDB = require('node-json-db');
var db2 = new JsonDB("data/settingsDataDB", true, false);
var db = new JsonDB("data/userDataDB", true, false);

db2.push("/currentWeek", "A");


cron.schedule("*/5 * * * *", function () {
    console.log("----Cron Job Datum Berechnen----");
    changeWeekGroup();
    changeDate();
    changeUserStatus();
});


function changeWeekGroup() {
    try {
        var currentWeek = db2.getData("/currentWeek");
        console.log("CW: " + currentWeek);
        switch (currentWeek) {
            case "A":
                db2.push("/currentWeek", "B");
                break;
            case "B":
                db2.push("/currentWeek", "C");
                break;
            case "C":
                db2.push("/currentWeek", "D");
                break;
            case "D":
                db2.push("/currentWeek", "A");
                break;
        }
    }catch (e) {
        
    }
}

function changeDate() {
    try {
        var date = new Date();
        date.setDate(date.getDate() + 7);
        console.log(date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear());
        var nextMittwoch = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        db2.push("/nextDate", nextMittwoch);
    }catch (e) {
        
    }
}

function changeUserStatus(){
    console.log("ChangeUserStatus----------");
    for (var i = 0; i <= 100; i++) {
        try {
            var user = db.getData("/" + i);
           // console.log(user);
            if (user.Name != undefined) {
              //  if (user.Gruppe == gr) {
                    var name = user.Name;
                    var gruppe = user.Gruppe;
                    var obj = {"Name": name, "Gruppe": gruppe, "Status": "belegt", "Vertretung": ""};
                    var str = JSON.stringify(obj);
                   // console.log(str);
                    db.push("/" + i, obj);
              //  }
            }
        } catch (error) {
        }
    }
}
