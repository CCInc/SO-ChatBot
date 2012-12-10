(function () {

function google ( args, cb ) {


    var item;
  req = new XMLHttpRequest();
            req.open('GET', 'http://rick.measham.id.au/paste/explain.pl?regex=' + args, async = false);
            req.onreadystatechange =  function processUser(){
        if(req.readyState == 4)
        {
        alert(req.responseText);
                 
        };
		}
            req.send(); 
		
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
