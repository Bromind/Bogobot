
var db = require('./db.js')

function undefined(bot, message) {
    var mardown = "Sorry, I did not understand.<br/>Try "
        + bot.appendMention(message, "help");

    bot.reply(message, mardown);
}

function find_user(usr, cmd) {
	return db.find({ "user": usr }, cmd);
}

function protected(bot, message, cmd) {
    find_user(message.user, function (err, docs) {
        if (docs == null || docs.lengh > 1 || !docs[0].prof) {
            return undefined(bot, message);
        } else {
            cmd(bot, message, docs[0]);
        }
    });
}

module.exports = {
	"protected":protected,
	"find_user":find_user
}