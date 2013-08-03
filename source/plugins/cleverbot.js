(function () {
"use strict"; 

bot.cleverbot = 
{
sessionid : '',

speak : function(speach)
{
    $.post('http://ccinc.host56.com/cleverbot.php', {"session_id" : this.sessionid, "message" : speach}, function(data) {
        var json = JSON.parse(data);
	 this.sessionid = json["session"].trim();
        speach.directreply(json["thought"]);
         console.log(this.sessionid);
});

}

};

}());