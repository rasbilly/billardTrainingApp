
var headline = document.getElementById("headline");
var subline = document.getElementById("subline");
var activeView;

window.onload = function () {
    loadDaily();
 };

function loadDaily() {
    headline.innerHTML = "Aktuelle Woche";
    subline.innerHTML = "";
    loadContext("daily");
    loadActive(0);
}

function loadGruppen() {
    headline.innerHTML = "Gruppen&uuml;bersicht";
    subline.innerHTML = "Auflistung aller Mitglieder der jeweiligen Gruppen";
    loadContext("group");
    loadActive(1);
}

function loadAdmin() {
    headline.innerHTML = "Administration";
    subline.innerHTML = "Hier können Benutzer Entfernt, Getauscht und Hinzugefügt werden.";
    loadContext("admin");
    loadActive(2);
}

function loadActive(elem) {
    activeView = elem;
    document.getElementsByTagName("li")[0].className = "nav-item";
    document.getElementsByTagName("li")[1].className = "nav-item";
    document.getElementsByTagName("li")[2].className = "nav-item";
    document.getElementsByTagName("li")[elem].className = "nav-item active";
}

function loadContext(cmd){
    document.getElementById("timestamp").innerHTML = new Date().toLocaleTimeString();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("context").innerHTML = this.responseText;
        }};
    xhttp.open("GET", "http://52.59.201.32:80/" + cmd, false);
    xhttp.send();
}

function refresh(){
    switch(activeView) {
        case 0: loadDaily(); break;
        case 1: loadGruppen(); break;
        case 2: loadAdmin(); break;
    }
}

