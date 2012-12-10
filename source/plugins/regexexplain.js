(function () {

function google ( args, cb ) {
var script = document.createElement('script');
script.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$.get("www.google.com", function(response) { console.log(response) }); 
		
}

bot.addCommand({
	name : 'regexexplain',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Explains a regex. /regexexplain regex',
	async : true
});
}());
