//
// Command: info
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([
        /^information of (.*) (.*)$/,
        /^information (.*) (.*)$/,
        /^info of (.*) (.*)$/,
        /^info (.*) (.*)$/,
        ], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, info);
    });
}

function info(bot, message, usr) {
    var first_name = message.match[1];
    var last_name = message.match[2];
    db.find({ first_name : first_name, last_name : last_name},
        function(err, docs) {
            if (docs.length != 1) {
                bot.reply(message, "User not found");
                return
            }
            var text = "\n- " + "First name: " + first_name;
            text += "\n- " + "Last name: " + last_name;
            text += "\n\n" + "TODO";
            bot.reply(message, text);
        }
    );

}