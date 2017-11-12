//
// Command: help
//

var util = require('../utils/util.js')

module.exports = function (controller, bot) {

    controller.hears([/help/], 'direct_message,direct_mention', function (bot, message) {
        util.protected(bot, message, prof_help, patient_help)
    });
}

function prof_help(bot, message, user) {
	text = "Help: \n";
	text += "\n- discharge FIRST_NAME LAST_NAME: FIRST_NAME LAST_NAME is know healthy, he left the hospital.";
	text += "\n- grant/revoke EMAIL_ADDRESS: become a doctor or become a patient.";
	text += "\n- help: this is it.";
	text += "\n- info FIRST_NAME LAST_NAME: get medical record of the given patient.";
	text += "\n- install FIRST_NAME LAST_NAME in room ROOM_NUMBER: become the doctor of the given patient and assign him the given room.";
	text += "\n- list: get all my patients.";

    bot.reply(message, text);
}

function patient_help(bot, message, user) {
	var text = "Help: \n";
	text += "\n- nurse: call for help.";
	text += "\n- fill your personnal informations.";
    bot.reply(message,text);
}

// var text = "Here are my skills:";
// text += "\n- " + bot.appendMention(message, "color") + ": ask to pick a random color";
// text += "\n- " + bot.appendMention(message, "restricted") + ": let a user pick a color among a set of options";
// text += "\n- " + bot.appendMention(message, "storage") + ": store picked color as a user preference";
// text += "\n- " + bot.appendMention(message, "threads") + ": branch to another thread";
// text += "\n- " + bot.appendMention(message, "variables") + ": enriched user-context among threads";
// text += "\n\nI also understand:";
// text += "\n- " + bot.appendMention(message, "about") + ": shows metadata about myself";
// text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
// text += "\n- " + bot.appendMention(message, "show [skill]") + ": display the code of the specified skill";
// bot.reply(message, text);
