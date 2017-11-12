
//
// Command: help
//
module.exports = function (controller) {

	controller.hears([/remote/], 'direct_message,direct_mention', function (bot, message) {

		bot.startPrivateConversationWithPersonId("Y2lzY29zcGFyazovL3VzL1BFT1BMRS80YWNjYWMzMy00NTU0LTRjYjEtOTM1Ny0yYzNhODY0MzczZTM", function(err, convo) {
			convo.say('The bot you invited has joined the channel.');
		});
    });
}
