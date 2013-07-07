(function () {

function google ( args, cb ) {

if(args == "") {args.reply("Usage: cc/php <keyword>. Displays help for PHP commands."); return;}

//var args = 'substr'; 
try
			{
$.ajax({
    type: 'GET',
    url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fus3.php.net%2F" + encodeURIComponent(args) + "'%20and%20xpath%3D'%2Fhtml%2Fhead%2Fbase'&format=json",
    dataType: 'json',
    success: function (data) {

        if (data["query"]["results"] != null) {
            var stuff = data["query"]["results"]["base"]["href"];
            stuff = stuff.substring(stuff.lastIndexOf("/") + 1, stuff.lastIndexOf("."));
            console.log(stuff);

            var xpath;
			
            
            if (stuff.startsWith("class") || stuff.startsWith("language.")) {
                xpath = "(//p[contains(@class, \"para\")])[1]";
            } 
			else if(stuff.startsWith("book."))
			{
				stuff = stuff.replace("book.", "intro.");
			}
			else {
                xpath = "(//div[@class=\"refsect1 description\"])[1]";
            }
			
            $.ajax({
                type: 'GET',
                url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'" + encodeURIComponent("https://raw.github.com/CCInc/phpmanual/master/" + stuff + ".html") + "'%20and%20xpath%3D'" + encodeURIComponent(xpath) + "'&format=xml",
                dataType: 'xml',
 success: function (data) {
					if((((new XMLSerializer()).serializeToString(data.getElementsByTagName("p")[0])).replace(/(<([^>]+)>)/ig,"")).replace(/\r\n|\r|\n/g, "").replace(/ +(?= )/g,"").trim() == "")
					{
						xpath = "(//p[contains(@class, \"para\")])[1]";
						
						$.ajax({
                type: 'GET',
                url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'" + encodeURIComponent("https://raw.github.com/CCInc/phpmanual/master/" + stuff + ".html") + "'%20and%20xpath%3D'" + encodeURIComponent(xpath) + "'&format=xml",
                dataType: 'xml',
 success: function (data) {
					if((((new XMLSerializer()).serializeToString(data.getElementsByTagName("p")[0])).replace(/(<([^>]+)>)/ig,"")).replace(/\r\n|\r|\n/g, "").replace(/ +(?= )/g,"").trim() == "")
					{
						xpath = "(//p[contains(@class, \"para\")])[1]";
					}
					var text = "["+stuff+"](http://php.net/"+args+") ";
                        text += (((new XMLSerializer()).serializeToString(data.getElementsByTagName("p")[0])).replace(/(<([^>]+)>)/ig,"")).replace(/\r\n|\r|\n/g, "").replace(/ +(?= )/g,"").trim();
                    
                    console.log((data));
                  //  console.log(StrippedString);
                   // var text = $(data).text().replace("Description", "");
                    if (text.length > 484) text = text.substr(0, 480) + '...';
                    console.log(text);
					args.send(text);
					
                }
            });
			return;
					}
					var text = "["+stuff+"](http://php.net/"+args+") ";
                    if(stuff.startsWith("class.") || stuff.startsWith("language."))
                    {
                        text += (((new XMLSerializer()).serializeToString(data.getElementsByTagName("p")[0])).replace(/(<([^>]+)>)/ig,"")).replace(/\r\n|\r|\n/g, "").replace(/ +(?= )/g,"").trim();
                    }
                    else
                    {
                    text +="`" + (((new XMLSerializer()).serializeToString(data.getElementsByTagName("div")[1])).replace(/(<([^>]+)>)/ig,"")).replace(/\r\n|\r|\n/g, "").replace(/ +(?= )/g,"").trim() + "` - *" + (((new XMLSerializer()).serializeToString(data.getElementsByTagName("p")[1])).replace(/(<([^>]+)>)/ig,"")).replace(/\r\n|\r|\n/g, "").replace(/ +(?= )/g,"").trim()+"*";
                    }
                    console.log((data));
                  //  console.log(StrippedString);
                   // var text = $(data).text().replace("Description", "");
                    if (text.length > 484) text = text.substr(0, 480) + '...';
                    console.log(text);
					args.send(text);
                }
            });
			

            // Show in console the jQuery Object.
            //  console.info('Here is the returned query');
            //console.log( $(data).text() );
        }
		else
		{
			IO.jsonp.google( args.toString() + ' site:php.net', finishCall );

	function finishCall ( resp ) {
		bot.log( resp, '/google response' );
		if ( resp.responseStatus !== 200 ) {
			finish( 'My Google-Fu is on vacation; status ' +
					resp.responseStatus );
			return;
		}

		//TODO: change hard limit to argument
		var results = resp.responseData.results.slice( 0, 3 );
		bot.log( results, '/google results' );

		if ( !results.length ) {
			args.send("o noes! not found!");
			return;
		}
		finish( format(args.content, results) );
	}

	function format ( query, results ) {
		var res = formatLink( query ) + ' ' +
			results.map( formatResult ).join( ' ; ' );

		if ( res.length > 200 ) {
			res = results.map(function (r) {
				return "[" + r.titleNoFormatting + "](" + r.unescapedUrl+")";
			}).join( ' ; ' );
		}

		return res;
	}

	function formatResult ( result ) {
		var title = IO.decodehtmlEntities( result.titleNoFormatting );
		return args.link( title, result.unescapedUrl );
	}
	function formatLink ( query ) {
		return args.link(
			'*',
			'http://google.com/search?q=' +
				encodeURIComponent( query ) );
	}

	function finish ( res ) {
		bot.log( res, '/google final' );
		if ( cb && cb.call ) {
			cb( res );
		}
		else {
			args.reply( res );
		}
	}
			//args.send ("Can't find the specified PHP item " + args + " !!!");
		}
    }
});
}
catch(e)
{
	args.send ("o noes! I got errored! @CCInc " + args + " !!!");
}
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}
String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

}

bot.addCommand({
	name : 'php',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Usage: php <keyword>. Displays help for PHP commands.',
	async : true
});
}());