(function () {
var nulls = [
	'The Google contains no such knowledge',
	'There are no search results. Run.' ];

function google ( args, cb ) {
	console.log(args.toString());
	IO.jsonp.google( args.toString(), finishCall );

	function finishCall ( resp ) {
		bot.log( resp, '/image response' );
		if ( resp.responseStatus !== 200 ) {
			finish( 'My Google-Fu is on vacation; status ' +
					resp.responseStatus );
			return;
		}
console.log(resp.responseData.results[0].url);
		//TODO: change hard limit to argument
		var results = resp.responseData.results( 0, 1 );
		bot.log( results, '/image results' );

		if ( !results.length ) {
			finish( nulls.random() );
			return;
		}
		finish(
			results.map( format ).join( ' ; ' ) );

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
			args.reply( res );
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
