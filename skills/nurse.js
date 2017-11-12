
//
// Command: nurse
//
var db = require('../utils/db.js');
var util = require('../utils/util.js');

module.exports = function (controller) {
	controller.hears([/nurse/], 'direct_message,direct_mention', function (bot, message) {
		util.find_user(message.user, function(err, docs){
			if (docs.length != 0) {
				var patient_fn = docs[0].first_name;
				var patient_ln = docs[0].last_name;
				var patient_ref_prof = docs[0].ref_prof;
				util.find_user(patient_ref_prof, function(err, docs_prof) {
					var prof_id = docs_prof[0].userId;
					bot.startPrivateConversationWithPersonId(prof_id, function(err, convo) {
						convo.say("Patient "+patient_fn+" "+patient_ln+" needs help !");
					});
				});
			} 
		});
	});
}
