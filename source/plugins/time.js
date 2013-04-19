(function () {

function google ( args, cb ) {
		console.log(args.toString());
IO.jsonp.time( args.toString(), done );

	function done ( resp ) {
		console.log(resp);
		args.send(calcTime(resp['request'][0]['query'],resp['data']['time_zone'][0]['utcOffset']));
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
