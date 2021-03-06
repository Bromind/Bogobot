//
// Welcome message 
// sent as the bot is added to a Cisco Spark space
//

var db = require('../utils/db.js');
var util = require('../utils/util.js');
var actorId = "";

module.exports = function (controller) {

    controller.on('bot_space_join', function (bot, event) {
	    actorId = event.actorId;

	    bot.startPrivateConversationWithPersonId(event.actorId, admission);
    });
}

function admission(err, convo) {




	var callback = function cb(err, docs) {
		    if (docs.length == 0) {
			    // Not found
			    convo.ask;
		    } else {
			    // Already exists
			    if (docs[0].has_issue == false) {
				    convo.ask;
			    } else {
				    convo.setVar("first_name", docs[0].first_name);
				    convo.setVar("last_name", docs[0].last_name);
				    convo.setVar("pain_location", docs[0].pain_location);
				    convo.setVar("pain_source", docs[0].pain_source);
				    convo.setVar("pain_scale", docs[0].pain_scale);
				    convo.gotoThread("summarize");
			    }
		    }
	}

	util.find_user_from_userid(actorId, callback);

	convo.ask("Hello, do you have a problem ?",[
		{
			pattern: "^yes$",
			callback: function (response, convo) {
				convo.gotoThread("askFirstName");
			},
		},
		{
			default: true,
			callback: function (response, convo) {
				convo.gotoThread("noProblem");
			}
		}
	], {});

	convo.addMessage(
		"Visits are open from 9am to 18pm except for emergencies.",
	"noProblem");

	convo.addQuestion(
		"What is your first name ?",
		function (answer, convo) {
			var name = convo.extractResponse('FirstName');
                        convo.setVar("first_name", name);
			convo.next()
			convo.gotoThread("askLastName");
		},
		{key: "FirstName"}, 
		"askFirstName"
	);
	
	convo.addQuestion(
		"What is your last name ?",
		function (answer, convo) {
			var name = convo.extractResponse('LastName');
                        convo.setVar("last_name", name);
			convo.next()
			convo.gotoThread("askProblem");
		},
		{key: "LastName"}, 
		"askLastName"
	);

	convo.addQuestion(
		"What is your problem (pain, nausea, fever) ?", 
		[
		{
			pattern: "^pain$",
			callback: function (response, convo) {
				convo.gotoThread("hasPain");
			},
		},
		{
			pattern: "^nausea$",
			callback: function (response, convo) {
				convo.gotoThread("hasNausea");
			},
		},
		{
			pattern: "^fever$",
			callback: function (response, convo) {
				convo.gotoThread("hasFever");
			},
		}
		],
		{},
		"askProblem"
	);
	
	convo.addQuestion(
		"You should come to the emergency service. I will prefill your admission form in order to go faster when you come to our secretary.\n Where is the pain ?",
		function (response, convo) {
			var name = convo.extractResponse('painLocation');
                        convo.setVar("pain_location", name);
			convo.next()
			convo.gotoThread("painSource");

		},
		{key: "painLocation"},
		"hasPain"
	);

	convo.addQuestion(
		"Did you hurt yourself or the pain come by itself ?",
		[
			{
				pattern: "itself",
				callback: function (response, convo) {
					convo.setVar("pain_source", "pain came by itself");
					convo.gotoThread("painScale");
				},
			},
			{
				pattern: "hurt",
				callback: function (respone, convo) {
					convo.setVar("pain_source", "pain came when you hurt yourself");
					convo.gotoThread("howGotHurt");
				},
			},
			{
				default: true,
				callback: function (response, convo) {
					convo.gotoThread("painSource");
				},
			}
		],
		{},
		"painSource"
	);

	convo.addQuestion(
		"Can you briefly describe how you hurt yourself ?",
		function (response, convo) {
			var name = convo.extractResponse('hurtCause');
			convo.setVar("hurt_cause", name);
			convo.next();
			convo.gotoThread("painScale");
		},
		{key: "hurtCause"},
		"howGotHurt"
	)

	convo.addQuestion(
		"On a scale from 0 (no pain) to 10 (can't survive that much pain), how much do you rate your pain ?",
		function(response, convo) {
			var name = convo.extractResponse('painScale');
                        convo.setVar("pain_scale", name);
			convo.next();
			convo.gotoThread("summarize");
		},
		{key: "painScale"},
		"painScale"
	);

	convo.addMessage(
		"For a fever, you'd rather go to see your regular doctor",
		"hasFever"
	);

	convo.addMessage(
		"For a nausea, you'd rather go to see your regular doctor",
		"askNausea"
	);

	convo.addMessage(
		"Hello {{vars.first_name}} {{vars.last_name}}, you feel pain in your {{vars.pain_location}} (the {{vars.pain_source}}) rated {{vars.pain_scale}} on a scale from 0 to 10",
		"summarize");

	convo.beforeThread(
		"summarize", 
		addDataInDB);

}

function addDataInDB(convo, next) {
	var record = {
		"userId": actorId,
		"first_name": convo.vars.first_name,
		"last_name": convo.vars.last_name,
		"pain_location": convo.vars.pain_location,
		"pain_source": convo.vars.pain_source,
		"hurt_cause": convo.vars.hurt_cause,
		"pain_scale": convo.vars.pain_scale,
		"user": convo.context.user,
		"prof": false,
		"has_issue": true,
	};
	db.insert(record);
	next();
}
