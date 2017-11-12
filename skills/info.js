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
            var text = "\n- " + "First name: " + first_name+" ";
            text += "\n- " + "Last name: " + last_name+" ";
            text += "\n- " + "Pain: " + docs[0].pain_scale + "/10 ";
            text += "\n- " + "Pain location: " + docs[0].pain_location+" ";
		if (docs[0].pain_source == "pain came by itself") {
			text += "\n- Pain came by itself";
		} else {
			text += "\n- Patient hurt himself <br> \t\""+docs[0].hurt_cause+"\"";
		}
            bot.reply(message, text);
        }
    );

}
