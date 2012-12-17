bot.ai =  (function () {

return function ( args) {
//console.log(args, 'args');
//console.log(args, 'args');
var a = 0;
var run = false;
var helper = function() {
    console.log(CryptoJS);
    var Cleverbot = function() {
        this.params = Cleverbot.default_params;
    };

    Cleverbot.default_params = {
        'stimulus': '',
        'start': 'y',
        'sessionid': '',
        'vText8': '',
        'vText7': '',
        'vText6': '',
        'vText5': '',
        'vText4': '',
        'vText3': '',
        'vText2': '',
        'icognoid': 'wsf',
        'icognocheck': '',
        'fno': '0',
        'prevref': '',
        'emotionaloutput': '',
        'emotionalhistory': '',
        'asbotname': '',
        'ttsvoice': '',
        'typing': '',
        'lineref': '',
        'sub': 'Say',
        'islearning': '1',
        'cleanslate': 'false'
    };
    Cleverbot.parserKeys = [
        'message', 'sessionid', 'logurl', 'vText8',
        'vText7', 'vText6', 'vText5', 'vText4',
        'vText3', 'vText2', 'prevref', '',
        'emotionalhistory', 'ttsLocMP3', 'ttsLocTXT', 'ttsLocTXT3',
        'ttsText', 'lineref', 'lineURL', 'linePOST',
        'lineChoices', 'lineChoicesAbbrev', 'typingData', 'divert'
        ];
    Cleverbot.digest = function(body) {
        var m = CryptoJS.MD5(body);
        return m.toString(CryptoJS.enc.Hex);
    };

    Cleverbot.encodeParams = function(a1) {
        var u = [];
        for (var x in a1) {
            if (a1[x] instanceof Array) {
                u.push(x + "=" + encodeURIComponent(a1[x].join(",")));
            }
            else if (a1[x] instanceof Object) {
                u.push(Cleverbot.default_params[a1[x]]);
            }
            else {
                u.push(x + "=" + encodeURIComponent(a1[x]));
            }
        }
        return u.join("&");
    };

    Cleverbot.prototype = {

        write: function(message, callback) {
            var clever = this;
            body = this.params;
            body.stimulus = message;
            body.icognocheck = Cleverbot.digest(Cleverbot.encodeParams(body).substring(9, 29));
            var options = {
                host: 'http://www.cleverbot.com',
                port: 80,
                path: '/webservicemin',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    //'Content-Length': Cleverbot.encodeParams(body).length
                }
            };
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open(options.method, options.host + options.path, true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       //     xmlhttp.setRequestHeader("Content-Length", Cleverbot.encodeParams(body).length);
            xmlhttp.send(Cleverbot.encodeParams(body));
            xmlhttp.onreadystatechange = function() {
              //  console.log('log');
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {

                        var cb = callback ||
                        function() {};

                        var chunk_data = xmlhttp.responseText.toString().split("\r"),
                            responseHash = {};
                        for (var i = 0, iLen = chunk_data.length; i < iLen; i++) {
                            clever.params[Cleverbot.parserKeys[i]] = responseHash[Cleverbot.parserKeys[i]] = chunk_data[i];
                        }
                      //  console.log(responseHash);
                        if(a== 0)
						{
						run = true;
                          cb(responseHash);
						  }
                        a++;

                    }
                }
            };


            // var req = http.request(options, function(res) {
            // var cb = callback || function(){};
            // res.on('data', function(chunk) {
            // var chunk_data = chunk.toString().split("\r")
            // , responseHash = {};
            // for(var i = 0, iLen = chunk_data.length;i<iLen;i++){
            // clever.params[Cleverbot.parserKeys[i]] = responseHash[Cleverbot.parserKeys[i]] = chunk_data[i];
            // }
            // cb(responseHash);
            // });
            // });
            // req.write(Cleverbot.encodeParams(body));
            // req.end();
        }
    };


    var CBots = [new Cleverbot, new Cleverbot],
        i = 0,
        name = ['Bob Loblaw', 'Stan Sitwell'],
        callback = function callback(resp) {
            CBots[i].write(resp['message'], callback);   
			if(run)
            args.directreply(resp['message']);
            console.log(resp['message'], 'responce')
        };

    callback({ message:args.content.replace(/^</, '')})
}




var script = document.createElement('script');
//console.log(this.readyState);
script.src = 'http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js';
script.type = 'text/javascript';
script.onreadystatechange = function() {
 //   console.log(this.readyState);
    //   if (this.readyState == 4) {helper()};
};
//console.log(script);
script.onload = helper;
document.getElementsByTagName('head')[0].appendChild(script);

};
}());
