var nudgeend = false;
    var items = [];
	var time;
	
(function () {
var msg = null;
//collection of nudges; msgObj, time left and the message itself
var nudges = [],
	interval = 100 * 60;

function update () {
	var now = Date.now();
	nudges = nudges.filter(function ( nudge ) {
		nudge.time -= interval;

		if ( nudge.time <= 0 ) {
		if(!nudgeend)
		{
			sendNudge(nudge );		
			nudge.time = time;
			}
	//	else
		//	return false;			
		}
			if(nudgeend)
				return false;
		return true;
	});

	setTimeout( update, interval );
}
function sendNudge ( nudge ) {
	    var req;

    var rand;
	        function getRandomQuestion(){
    var item;
  req = new XMLHttpRequest();
            req.open('GET', 'http://api.stackexchange.com/2.1/search/advanced?order=asc&sort=votes&closed=True&title=how%20do%20i&site=stackoverflow&tagged='+nudge.sourcemessage, async = false);
            req.onreadystatechange =  function processUser(){
        if(req.readyState == 4)
        {
        var res = JSON.parse(req.responseText);
        
        for (var i = 0; i < res["items"].length; i++) 
        {
            items.push(res.items[i].title);
        }
           global = items[Math.floor(Math.random() * items.length)];               
        }
                 
        };
            req.send();    
            console.log(global);
			console.log('http://api.stackexchange.com/2.1/search/advanced?order=asc&sort=votes&closed=True&title=how%20do%20i&site=stackoverflow&tagged='+nudge.sourcemessage);

			if(htmlDecode(global)[htmlDecode(global).length-1]!='?')
				return htmlDecode(global)+'?';
            return htmlDecode(global);
            
        }
    //let's put an arbitrary comment here
function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}
	//check to see if the nudge was sent after a bigger delay than expected
	//TODO: that ^
	if(!nudgeend)
		nudge.msg.send( getRandomQuestion());
}
setTimeout( update, interval );

//now for the command itself
function addNudge ( delay, message, msgObj ) {
if(!nudgeend)
{
	var inMS;
	console.log( delay, message, '/nudge input' );
msg = this.msgObj;
console.log( msg, 'nudge msag' );
	//interval will be one of these (where n is a number):
	// nm  =>  n minutes
	// n   =>  n minutes
	//so erm...yeah. just parse the bitch
	delay = parseFloat( delay );
	//minsInMs = mins * 60 * 1000
	//TODO: allow more than just minutes
	//TODO: upper cap
	inMS = delay * 60000;

	if ( isNaN(inMS) ) {
		return 'Many things can be labeled Not a Number; a delay should not' +
			' be one of them.';
	}
	
	time = inMS;




//htmlDecode('&lt;&gt;'); // "<>"
    var nudge = {
        msg     : msgObj,
        message : "",
        register: Date.now(),
        time    : inMS,
		delay : delay,
		sourcemessage: message,
		msgObject : msgObj
    };
	nudges.push( nudge );
	//console.log( nudge, nudges, '/nudge register' );

	//return 'Nudge registered.';
}
}

bot.addCommand({
	name : 's',
	fun  : nudgeCommand,
	permissions : {
		del : 'NONE',
		use : bot.owners
	},

	description : 'Register a nudge after an interval. ' +
		'`/nudge intervalInMinutes message`, or the listener, ' +
		'`nudge|remind|poke me? in? intervalInMinutes message`'
});

bot.listen(/s?(\s?(.*))$/,
	nudgeListener
);

function nudgeCommand ( args ) {
	var props = args.parse();
	return addNudge( props[0], props.slice(1).join(' '), args );
}
function nudgeListener ( args ) {
	return addNudge( args.matches[1], args.matches[2], args );
}

}());
(function () {

// //collection of nudges; msgObj, time left and the message itself
// var nudges = [],
	// interval = 100 * 60;

// function update () {
	// var now = Date.now();
	// nudges = nudges.filter(function ( nudge ) {
		// nudge.time -= interval;

		// if ( nudge.time <= 0 ) {
			// sendNudge( nudge );
			// return false;
		// }
		// return true;
	// });

	// setTimeout( update, interval );
// }
// function sendNudge ( nudge ) {
	// console.log( nudge, 'nudge fire' );
	// //check to see if the nudge was sent after a bigger delay than expected
	// //TODO: that ^
	// nudge.msg.reply( nudge.message );
// }
// setTimeout( update, interval );

// //now for the command itself
// function addNudge ( delay, message, msgObj ) {
	// var inMS;
	// console.log( delay, message, '/nudge input' );

	// //interval will be one of these (where n is a number):
	// // nm  =>  n minutes
	// // n   =>  n minutes
	// //so erm...yeah. just parse the bitch
	// delay = parseFloat( delay );
	// //minsInMs = mins * 60 * 1000
	// //TODO: allow more than just minutes
	// //TODO: upper cap
	// inMS = delay * 60000;

	// if ( isNaN(inMS) ) {
		// return 'Many things can be labeled Not a Number; a delay should not' +
			// ' be one of them.';
	// }

	// //let's put an arbitrary comment here

	// var nudge = {
		// msg     : msgObj,
		// message : '*nudge* ' + message,
		// register: Date.now(),
		// time    : inMS
	// };
	// nudges.push( nudge );
	// //console.log( nudge, nudges, '/nudge register' );

	// //return 'Nudge registered.';
// }

bot.addCommand({
	name : 'ss',
	fun  : nudgeCommand,
	permissions : {
		del : 'NONE',
		use : bot.owners
	},

	description : 'Register a nudge after an interval. ' +
		'`/nudge intervalInMinutes message`, or the listener, ' +
		'`nudge|remind|poke me? in? intervalInMinutes message`'
});

bot.listen(/(stops\s?(.*)$)|ss/,
	nudgeListener
);

function nudgeCommand ( args ) {
	// var props = args.parse();
	// return addNudge( props[0], props.slice(1).join(' '), args );
	nudgeend = true;
}
function nudgeListener ( args ) {
	//return addNudge( args.matches[1], args.matches[2], args );
}

}());
