
var db = require('./db.js')

function undefined(bot, message) {
    var mardown = "Sorry, I did not understand.<br/>Try "
        + bot.appendMention(message, "help");

    bot.reply(message, mardown);
}

function find_user(usr, cmd) {
    return db.find({ user: usr }, cmd);
}

function is_signedin(usr) {
    return find_user(usr, function(err, docs){
        return docs.lengh == 0
    });
}

function protected(bot, message, cmd, cmd_) {
    return find_user(message.user, function (err, docs) {
        if (docs == null || docs.lengh > 1){
            return undefined(bot, message);
        } else if (!docs[0].prof) {
            if (cmd_ == null) {
                return undefined(bot, message);
            } else {
                return cmd_(bot, message, docs[0])
            }
        } else {
            return cmd(bot, message, docs[0]);
        }
    });
}

module.exports = {
    "protected":protected,
    "find_user":find_user
}