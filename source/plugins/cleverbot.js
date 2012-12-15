(function () {

function google ( args, cb ) {


var Cleverbot = require('./lib.js');

var CBots = [new Cleverbot,new Cleverbot]
  , i = 0
  , name = ['Bob Loblaw', 'Stan Sitwell']
  , callback = function callback(resp){
    CBots[i].write(resp['message'],callback);
    args.directreply( resp['message'])
  };

callback({message:args})

}

bot.addCommand({
	name : 'ai',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Preforms AI. /ai query',
	async : true
});
}());
