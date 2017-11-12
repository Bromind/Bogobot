
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

function protected(bot, message, cmd, cmd_) {
    return find_user(message.user, function (err, docs) {
        if (docs == null || docs.lengh > 1){
            undefined(bot, message);
        } else if (!docs[0].prof) {
            if (cmd_ == null) {
                undefined(bot, message);
            } else {
                cmd_(bot, message, docs[0])
            }
        } else {
            cmd(bot, message, docs[0]);
        }
    });
}

function draw_gnuplot(pain_array, bot, message) {
	var fs = require('fs');
	fs.writeFile("./image/pain_data", pain_array+"\n", function(err) {
		if(err) {
			return console.log(err);
		}

		var exec = require('child_process').exec;
		exec('cd image; ./process_image.sh; cd ..', function callback(error, stdout, stderr){
			console.log(stdout);
			console.log("send file");
			bot.reply(message,{text: 'Pain evaluation graph', files:[fs.createReadStream('./image/pain_evolution.png')]});
		});

	});
}

module.exports = {
	protected:protected,
	find_user:find_user,
	get_data_from_user: get_data_from_user,
	find_user_from_userid: find_user_from_userid,
	is_signedin_from_userid: is_signedin_from_userid,
	get_data_from_userid: get_data_from_userid,
	draw_gnuplot:draw_gnuplot
}
