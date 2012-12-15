(function () {

function google ( args, cb ) {

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

args.send("http://en.wikipedia.org/wiki/" + encodeURIComponent(args));

}

bot.addCommand({
	name : 'wiki',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Gets a Wikipedia article. /wiki query',
	async : true
});
}());
