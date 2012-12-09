(function () {
var nulls = [
	'The Google contains no such knowledge',
	'There are no search results. Run.' ];

function google ( args, cb ) {
	var random = false;
	var number = 0;

	console.log(args.toString());
	if(args.split(' ')[0].toLowerCase() == 'random')
	{
	random = true;
	IO.jsonp.image( args.split(' ').splice(0, 1).join(' '), finishCall );
	}
	else if(!isNaN(args.split(' ')[0]))
	{
		number = args.split(' ')[0] - 1;
	IO.jsonp.image( args.split(' ').splice(0, 1).join(' '), finishCall );
	}
	
	IO.jsonp.image( args.toString(), finishCall );
	
	function finishCall ( resp ) {
		bot.log( resp, '/image response' );
		if ( resp.responseStatus !== 200 ) {
			finish( 'My Google-Fu is on vacation; status ' +
					resp.responseStatus );
			return;
		}
var results;
		//TODO: change hard limit to argument
		if(number != 0)
		results = resp.responseData.results[number];
		else if(!random)
		results = resp.responseData.results[0];
		else
		results = resp.responseData.results[Math.floor(Math.random()*50)];
		
		
		bot.log( results, '/image results' );
		
		finish(
			results.url);

		function format ( result ) {
			var title = IO.decodehtmlEntities( result.titleNoFormatting );
			return args.link( title, result.url );
		}
	}

	function finish ( res ) {
		bot.log( res, '/image final' );
		if ( cb && cb.call ) {
			cb( res );
		}
		else {
			args.send( res );
		}
	}
}

bot.addCommand({
	name : 'image',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Search Google images. `/image query`',
	async : true
});
}());
