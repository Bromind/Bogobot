//
// Command: init-db
//

var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([/init-db/], 'direct_message,direct_mention', function (bot, message) {
        var tab = [];
        tab[0] = {
            "userId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS80YWNjYWMzMy00NTU0LTRjYjEtOTM1Ny0yYzNhODY0MzczZTM",
            "user":"aurelien.bloch@epfl.ch",
            "first_name":"Aurelien",
            "last_name":"Bloch",
            "_id":"KF0dlXYP82MdHKM6",
            "prof":true,
            "patients":[
                {
                    "first_name":"Scheldon",
                    "last_name":"Cooper"
                }
            ]
        }
        tab[1] = {
            "user":"Jean.Valjean@epfl.ch",
            "first_name":"Jean",
            "last_name":"Valjean",
            "_id":"KF0dlXYP82MdHKM7",
            "prof":false
        }
        tab[2] = {
            "user":"jean.bon@epfl.ch",
            "first_name":"Jean",
            "last_name":"Bon",
            "_id":"KF0dlXYP82MdHKM8",
            "prof":false
        }
        tab[3] = {
            "user":"scheldon.cooper@caltech.edu",
            "first_name":"Scheldon",
            "last_name":"Cooper",
            "_id":"KF0dlXYP82MdHKM9",
            "prof":false,
            "ref_prof":"aurelien.bloch@epfl.ch"
        }
        tab[4] = {
            "userId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS9iNWE0ZDI2OS1lMGZkLTQ4NzQtYWEyZS1lMWM5NzBmYjRhYzA",
            "first_name":"Patient",
            "last_name":"One",
            "pain_location":"foot",
            "pain_source":"pain came when you hurt yourself",
            "hurt_cause":"fallen from a chair",
            "pain_scale":"5",
            "user":"bloch.aurelien@gmail.com",
            "prof":false,
            "has_issue":true,
            "_id":"mVYKjbU1n9vPTQay"
        }
        db.insert(tab);
    });
}
