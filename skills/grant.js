//
// Command: grant
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([/^(grant|revoke) access to (.*)$/,/^(grant|revoke) access (.*)$/], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, grant)
    });
}

function grant(bot, message, usr) {
    var access = (message.match[1] == "grant")
    db.update({ user:message.match[2] },
        { $set: { prof:access } }, {}, function(err, numAffected) {
            if (err || numAffected != 1) {
                bot.reply(message, "User not found");
            } else {
                bot.reply(message, "Access " + message.match[1]);
            }
        })
}