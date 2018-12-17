var express = require('express');
var router = express.Router();

var JsonDB = require('node-json-db');
var database = new JsonDB("data/userDataDB", true, false);

/* GET users listing. */
router.get('/', function (req, res) {


    database.reload(); //TODO

    var html = "";

    html += "<h4>Gruppe A</h4>";
    html += table("A");
    html += "<h4>Gruppe B</h4>";
    html += table("B");
    html += "<h4>Gruppe C</h4>";
    html += table("C");
    html += "<h4>Gruppe D</h4>";
    html += table("D");
    // console.log(html);
    res.send(html);

});

module.exports = router;


function table(gr) {
    console.log("start Table: " + gr);
    var tableHtml = "";
    tableHtml += "<table>";
    for (var i = 0; i <= 100; i++) {
        try {
            var user = database.getData("/" + i);
            if (user.Name != undefined) {
                if (user.Gruppe == gr) {
                    tableHtml += "<tr><td>" + user.Name + "</td></tr>";
                }
            }
        } catch (error) {
        }
    }
    tableHtml += "</table><br><style> \n" +

        "@media only screen and (max-device-width:568px){table {border-collapse: collapse; width: 100%;}}" +
        "@media only screen and (min-device-width:569px){table {border-collapse: collapse; width: 40%; }}" +
        "tr:hover {background-color:#dcdcdc;} th, td {\n" +
        "  padding: 8px;\n" +
        "  text-align: left;\n" +
        "  border-bottom: 1px solid #ddd;\n" +
        "}</style>";
    return tableHtml;
}