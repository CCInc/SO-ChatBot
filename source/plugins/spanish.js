(function () {
//add a bot command
bot.addCommand({
    name : 'spanish',
    fun : spanish,

    //permissions object (can be ommitted for all-can-use, all-can-del)
    permissions : {
        use : 'ALL' ,
        del : 'NONE' 
    },
    description : 'Translate from english to spanish',

    //whether the command is asynchronous or not (default false)
    async : false
});

function spanish (args, cb) {
      var from = "en", to = "es", text = args.toString();

            var s = document.createElement("script");
            s.src = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
                "?appId=Bearer " + encodeURIComponent(window.accessToken) +
                "&from=" + encodeURIComponent(from) +
                "&to=" + encodeURIComponent(to) +
                "&text=" + encodeURIComponent(text) +
                "&oncomplete=mycallback";
            args.send(document.body.appendChild(s));
}

//add a listening regex and a corresponding callback
};());
