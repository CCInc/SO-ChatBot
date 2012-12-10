(function () {

function google ( args, cb ) {
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.8.3.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//$.get("http://rick.measham.id.au/paste/explain.pl?regex=" + encodeURIComponent(args), function(response) { console.log(response) }); 
		
		$.ajax({
    url: "http://rick.measham.id.au/paste/explain.pl?regex=" + encodeURIComponent(args),
    type: 'GET',
	crossDomain: true,
    success: function(res) {
       // var headline = $(res.responseText).find('a.tsh').text();
        console.log(res);
    }
});
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
