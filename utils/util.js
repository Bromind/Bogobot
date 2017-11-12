
var db = require('./db.js')

function undefined(bot, message) {
    var mardown = "Sorry, I did not understand.<br/>Try "
        + bot.appendMention(message, "help");

    bot.reply(message, mardown);
}

function find_user(usr, cmd) {
	return db.find({ user: usr }, cmd);
}

function get_data_from_user(usr) {
	return find_user(usr, function(err, docs) {
		if (docs.lenghth == 0) {
			return null;
		} else {
			return docs[0];
		}
	});
}

function find_user_from_userid(usrid, cmd) {
	return db.find({ userId: usrid }, cmd);
}

function get_data_from_userid(usrid) {
	return find_user_from_userid(usrid, function(err, docs) {
		if (docs.length == 0) {
			return null;
		} else {
			return docs[0];
		}
	});
}

function is_signedin_from_userid(usrid) {
	var res = find_user_from_userid(usrid, function(err, docs){
		console.log("DOCS : " + docs);
		return docs.length != 0;
	});
	console.log(res);
	return res;
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
	protected:protected,
	find_user:find_user,
	get_data_from_user: get_data_from_user,
	find_user_from_userid: find_user_from_userid,
	is_signedin_from_userid: is_signedin_from_userid,
	get_data_from_userid: get_data_from_userid,
}
