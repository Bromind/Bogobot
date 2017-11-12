//
// Command: installation
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([
        /installation of (.*) (.*) in room (.*)/,
        /install (.*) (.*) in room (.*)/,
        ], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, installation);
    });
}

function installation(bot, message, usr) {
    var first_name = message.match[1];
    var last_name = message.match[2];
    var room = message.match[3];
    var patient = { first_name : first_name, last_name : last_name };

    db.update(patient,
    { $set: { room:room, ref_prof:usr.user, admission_date:new Date() } }, {}, function(err, numAffected) {
        if (err || numAffected != 1) {
            bot.reply(message, "User not found");
        } else {
            db.update(usr,
            {$push : {patients:patient}}, {}, function(err, numAffected) {
                if (err || numAffected != 1) {
                    bot.reply(message, "User not found");
                } else {
                    bot.reply(message, "installation succeed");
                }
            })
        }
    })
}