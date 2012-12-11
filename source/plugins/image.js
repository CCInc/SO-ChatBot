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
	console.log('true');
	random = true;
	var argsarray = args.split(' ');
	argsarray.splice(0, 1);
	IO.jsonp.image( argsarray.join(' '), finishCall );
	}
	else if(!isNaN(args.split(' ')[0]))
	{
		if(args.split(' ')[0] > 4)
		{
			args.reply('USE NUMBERS LESS THAN 5');
			return;
		}
	
	console.log(args.split(' ').splice(0, 1).join(' ').toString(), 'nan');
		number = args.split(' ')[0] - 1;
			var argsarray = args.split(' ');
	argsarray.splice(0, 1);
	IO.jsonp.image( argsarray.join(' '), finishCall );
	}
	else{ console.log('neither');
	
	IO.jsonp.image( args.toString(), finishCall );}
	
	function finishCall ( resp ) {
		bot.log( resp, '/image response' );
		// if ( resp.responseStatus !== 200 ) {
			// finish( 'My Google-Fu is on vacation; status ' +
					// resp.responseStatus );
			// return;
		// }
var results;
		//TODO: change hard limit to argument
		
		if(number != 0)
		{console.log('number');
		results = resp.items[number];}
		else if(!random){console.log('not random');
		results = resp.items[0];}
		else{console.log('random');
		results = resp.items[Math.floor(Math.random()*50)];}
		
		
		bot.log( results, '/image results' );
		var url;
		if(results.lastIndexOf('.') != results.length-3)
		{
			console.log('DOES NOT CONTAIN EXTENSION');
			finish(
			results.url + "#.png");
		}
		else
		finish(
			results.url );
		
		
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
	description : 'Search Google images. `/image number|random query`',
	async : true
});
}());
