(function () {

function google ( args, cb ) {

	var url = 
function getRandomQuestion(){
    var item;
  req = new XMLHttpRequest();
            req.open('GET', 'http://rick.measham.id.au/paste/explain.pl?regex=' + args, async = false);
            req.onreadystatechange =  function processUser(){
        if(req.readyState == 4)
        {
        alert(req.responseText);
                 
        };
            req.send(); 

			if(htmlDecode(global)[htmlDecode(global).length-1]!='?')
				return htmlDecode(global)+'?';
            return htmlDecode(global);
            
        }
		}
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
