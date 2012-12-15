(function () {

function google ( args, cb ) {
// var script = document.createElement('script');
// script.src = 'http://code.jquery.com/jquery-1.8.3.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

//$.get("http://rick.measham.id.au/paste/explain.pl?regex=" + encodeURIComponent(args), function(response) { console.log(response) }); 
		
		// $.ajax({
    // url: "http://rick.measham.id.au/paste/explain.pl?regex=" + encodeURIComponent(args),
    // type: 'GET',
	// crossDomain: true,
    // success: function(res) {
       // // var headline = $(res.responseText).find('a.tsh').text();
        // console.log(res);
    // }
// });
ajaxRequest = new XMLHttpRequest(); 
ajaxRequest.open("GET", "http://rick.measham.id.au/paste/explain.pl?regex=" + encodeURIComponent(args), true); 
ajaxRequest.send(null); 
ajaxRequest.onreadystatechange = function () { 

if ( ajaxRequest.readyState == 4 ) { 
if ( ajaxRequest.status == 200 ) { 
var RESPONSE_ = ajaxRequest.responseText; 

var info = RESPONSE_.slice(RESPONSE_.indexOf('--------------------------------------------------------------------------------') + '--------------------------------------------------------------------------------'.length + 1, RESPONSE_.indexOf('</pre>'));
console.log(info, 'info');
args.send(info); 
}} 
};

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
