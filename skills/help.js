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
	text += "\n- " + bot.appendMention(message, "discharge FIRST_NAME LAST_NAME") + "<br>\tFIRST_NAME LAST_NAME is know healthy, he left the hospital.";
	text += "\n- " + bot.appendMention(message, "grant/revoke EMAIL_ADDRESS") + "<br>\tbecome a doctor or become a patient.";
	text += "\n- " + bot.appendMention(message, "help") + "<br>\tthis is it.";
	text += "\n- " + bot.appendMention(message, "info FIRST_NAME LAST_NAME") + "<br>\tget medical record of the given patient.";
	text += "\n- " + bot.appendMention(message, "install FIRST_NAME LAST_NAME in room ROOM_NUMBER") + "<br>\tbecome the doctor of the given patient and assign him the given room.";
	text += "\n- " + bot.appendMention(message, "list") + "<br>\tget all my patients.";

    bot.reply(message, text);
}

function patient_help(bot, message, user) {
	var text = "Help: \n";
	text += "\n- " + bot.appendMention(message, nurse) + " call for help.";
	text += "\n- " + bot.appendMention(message, complete profil) + " fill your personnal informations.";
    bot.reply(message,text);
}