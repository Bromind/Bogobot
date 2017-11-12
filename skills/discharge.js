//
// Command: discharge
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([
        /^discharge of (.*) (.*)$/,
        /^discharge (.*) (.*)$/,
        ], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, discharge);
    });
}

function discharge(bot, message, usr) {
    var first_name = message.match[1];
    var last_name = message.match[2];
    var patient = { first_name : first_name, last_name : last_name };

    db.update(patient,
    { $unset: {
            room:true,
            ref_prof:true,
            admission_date:true,
            pain_location:true,
            pain_source:true,
            hurt_cause:true,
            pain_scale:true,
        } },
        {},
        function(err, numAffected) {
            if (err || numAffected != 1) {
                bot.reply(message, "User not found");
            } else {
                db.update(patient,
                    {$set : {  has_issue:false, discharge_date:new Date()}},
                    {},
                    function(err, numAffected) {
                        if (err || numAffected != 1) {
                            bot.reply(message, "User not found");
                        } else {
                            bot.reply(message, "Patient discharged");
                        }
                });
            }
    })


}
