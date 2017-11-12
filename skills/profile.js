var db = require('../utils/db.js');
var util = require('../utils/util.js');


module.exports = function (controller) {
	controller.hears([/profile/], 'direct_message,direct_mention', function (bot, message) {
		bot.startConversation(message, function (err, convo) {
			var user_mail = message.user;
			var user_search = {user: user_mail};
			emptyProfileField(message.user, convo);

			convo.addQuestion(
				"Have you a special diet", 
				function (answer, convo) {
					var diet = convo.extractResponse('diet');
					db.update(user_search, 
						{$set: {diet:diet}}, 
						{},
						function(err, n) {
							emptyProfileField(user_mail, convo);
						}
					);

				},
				{key: "diet"},
				"askDiet"
			);

			convo.addQuestion(
				"What is your birth date ?", 
				function (answer, convo) {
					var birth = convo.extractResponse('birth_date');
					db.update(user_search, 
						{$set: {birth_date: birth}}, 
						{},
						function(err, n) {
							emptyProfileField(user_mail, convo);
						}
					);

				},
				{key: "birth_date"},
				"askBirthDate"
			);

			convo.addQuestion(
				"What is your sex ?", 
				function (answer, convo) {
					var sex_var = convo.extractResponse('sex');
					db.update(user_search, 
						{$set: {sex: sex_var}}, 
						{},
						function(err, n) {
							emptyProfileField(user_mail, convo);
						}
					);

				},
				{key: "sex"},
				"askSex"
			);
		});
	});
}


function emptyProfileField(user, convo) {
	util.find_user(user, function (err, docs) {
		var empty_fields = [];
		if (docs.length != 0) {
			if (docs[0].diet == null) {
				convo.gotoThread('askDiet');
			}
			if (docs[0].birth_date == null) {
				convo.gotoThread('askBirthDate');
			}
			if (docs[0].sex == null) {
				convo.gotoThread('askSex');
			}
		}
	});
}
