
//
// Command: gnupot
//

var util = require('../utils/util.js')
var db = require('../utils/db.js')

module.exports = function (controller, bot) {

    controller.hears([/gnuplot/], 'direct_message,direct_mention', function (bot, message) {
	    console.log("gnuplot");
	    util.draw_gnuplot([6, 6, 5, 4, 3]);
    });
}

