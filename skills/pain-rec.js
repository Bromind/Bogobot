//
// Command: recursive pain
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {
    controller.hears([
        /ask (.*) (.*) for pain level ([0-9]+) times every ([0-9]+) secondes/,
        ], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, pain_rec);
    });
}

function pain_rec(bot, message, usr) {
    var first_name = message.match[1];
    var last_name = message.match[2];
    var rec = parseInt(message.match[3], 10);
    var sec = parseInt(message.match[4], 10);

    var patient = { first_name : first_name, last_name : last_name };
    console.log("*test1")
    console.log(patient)
    console.log(rec)
    console.log(sec)
    db.find(patient, function(err, docs){
        if (err || docs.length != 1) {
            bot.reply(message, "User not found");
        } else {
            var patient_id = docs[0].userId;
                var nb = 0;
                var test = function(nb) {
                    nb = nb + 1;
                    bot.startPrivateConversationWithPersonId(patient_id, function(err, convo) {
                        convo.ask("On a scale from 0 (no pain) to 10 (can't survive that much pain), how much du you rate your pain ?",function (response, convo) {
                            var value = parseInt(response.text);
                            db.update(patient,
                            {$push : {pain_scales:value}}, {}, function(err, numAffected) {
                                if (err || numAffected != 1) {
                                    bot.reply(message, "User not found");
                                } else {
                                    db.update(patient,
                                    {$set : {pain_scale:value}}, {}, function(err, numAffected) {
                                        if (err || numAffected != 1) {
                                            bot.reply(message, "User not found");
                                        } else {
                                            convo.say("Pain recorded\n");
                                            convo.next();
                                        }
                                    })
                                }
                            })
                        });

                        if (nb >= rec) {
                            return;
                        } else {
                            setTimeout(test, sec * 1000, nb);
                        }
                    }) ;

                }
                test(nb);
        }
    });
}