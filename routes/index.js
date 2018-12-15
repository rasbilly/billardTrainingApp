var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
     //res.sendFile('/home/ubuntu/BillardTrainingApp/public/website.html');
    var pfad = __dirname ;
    pfad = pfad.substring(0,pfad.length-6);

    res.sendFile(pfad+"public/website.html");
});

module.exports = router;
