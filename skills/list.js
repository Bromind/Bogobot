//
// Command: list
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([
        /list/,
        /list patients/,
        /list assigned patients/,
        ], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, list);
    });
}

function list(bot, message, usr) {
    var text = "Your assigned patients are\n";
    for(var i = 0; i < usr.patients.length; i++) {
        var p = usr.patients[i];
        text += "\n- " + bot.appendMention(message, p.first_name + " " + p.last_name);
    }
    text += "\n\ntype : " + bot.appendMention(message, "info first_name last_name");
    text += " to get details"
    bot.reply(message, text);
}