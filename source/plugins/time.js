(function () {

function google ( args, cb ) {
		IO.jsonp({
		url : 'http://api.worldweatheronline.com/free/v1/tz.ashx',
		data : {
			q   : args.toString(),
			format: 'json',
			callback: done,
			key : 'e7qnb5e3xh3cy2kysypbmuj5'
		},
		fun : done
	});

	function done ( resp ) {

		args.send(calcTime(args.toString(),resp.data.time_zone.utcOffset));
	}
	
	}
	
	
	// function to calculate local time
// in a different city
// given the city's UTC offset
function calcTime(city, offset) {

    // create Date object for current location
    d = new Date();
    
    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));
    
    // return time as a string
    return "The local time in " + city + " is " + nd.toLocaleString();

}



bot.addCommand({
	name : 'time',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Gets the current time in wherever. Acceptable formats are:- City Name; City Name, State (US only); City Name, State, Country; City Name, Country `/time request`',
	async : true
});
}());
