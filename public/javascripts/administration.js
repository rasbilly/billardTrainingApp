
function formAddUser() {
    var pwIn = document.getElementById("InputPasswortAdd").value;
    if (pwIn == 'test') {
        var userName = document.getElementById("InputNameAdd").value;
        var group = document.getElementById("InputGroupAdd").value;
        var res = httpGet("http://52.59.201.32:80/data/addUser/" + userName + "/" + group);
        document.getElementById("meldungAdd").innerHTML = res;
        document.getElementById("meldungAdd").style.color = "green";
        console.log("Benutzer hinzugefügt!");
    } else {
        console.log("Falsches Passwort!");
        document.getElementById("meldungAdd").innerHTML = "Falsches Passwort!";
        document.getElementById("meldungAdd").style.color = "red";
    }
}

function formChangeUserGroup() {
    var pwIn = document.getElementById("InputPasswortChange").value;
    if (pwIn == 'test') {
        var userName = document.getElementById("InputNameChange").value;
        var group = document.getElementById("InputGroupChange").value;
        var res = httpGet("http://52.59.201.32:80/data/changeGroup/" + userName + "/" + group);
        document.getElementById("meldungChange").innerHTML = res;
        document.getElementById("meldungChange").style.color = "green";
        console.log("Gruppe erfolgreich geändert!");
    } else {
        console.log("Falsches Passwort!");
        document.getElementById("meldungChange").innerHTML = "Falsches Passwort!";
        document.getElementById("meldungChange").style.color = "red";
    }
}

function formDeleteUser() {
    var pwIn = document.getElementById("InputPasswortDelete").value;
    if (pwIn == 'test') {
        var userName = document.getElementById("InputNameDelete").value;
        var res = httpGet("http://52.59.201.32:80/data/deleteUser/" + userName);
        document.getElementById("meldungDelete").innerHTML = res;
        document.getElementById("meldungDelete").style.color = "green";
        console.log("Benutzer gelöscht!");
    } else {
        console.log("Falsches Passwort!");
        document.getElementById("meldungDelete").innerHTML = "Falsches Passwort!";
        document.getElementById("meldungDelete").style.color = "red";
    }
}

function changeWeek() {
    var pwIn = document.getElementById("InputPasswortWeek").value;
    if (pwIn == 'test') {
        var newWeek = document.getElementById("InputWeekChange").value;
        var res = httpGet("http://52.59.201.32:80/data/changeWeek/" + newWeek);
        document.getElementById("meldungWeek").innerHTML = res;
        document.getElementById("meldungWeek").style.color = "green";
        console.log("Woche geändert.");
    } else {
        console.log("Falsches Passwort!");
        document.getElementById("meldungWeek").innerHTML = "Falsches Passwort!";
        document.getElementById("meldungWeek").style.color = "red";
    }
}

function freigeben(i) {
    console.log("freigeben: " + i);
    document.getElementById("zeile" + i).style.backgroundColor = "#BEF781";
    document.getElementById("z" + i + "1").innerHTML = "Platz wirklich freigeben?";
    document.getElementById("z" + i + "2").innerHTML = "<button style='width: 80%' onclick='enterFreigeben(true," + i + ")'>JA</button>";
    document.getElementById("z" + i + "3").innerHTML = "<button style='width: 80%' onclick='enterFreigeben(false," + i + ")'>Nein</button>";
}

function enterFreigeben(bool, i) {
    console.log("eneteFreigebn");
    if (bool == false) {
        location.reload();
        console.log("faalse");
       // httpGet("http://52.59.201.32:80/daily"); //TODO schöner aber geht nicht
    } else if (bool = true) {

        httpGet("http://52.59.201.32:80/changeState/"+ i);

        console.log("i: " + i);
    //    document.getElementById("z" + i + "1").innerHTML = "<input placeholder='Neuen Name eingeben'> </input>";
    //    document.getElementById("z" + i + "2").innerHTML = "<button>Bestätigen</button>";
    //    document.getElementById("z" + i + "3").innerHTML = "frei";

    }
}


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}