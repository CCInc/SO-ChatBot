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
var text =args;
$.post(
    'http://ccinc.host56.com/Translate.php', {txtToTranslate:text},
	       
    function(data){
  console.log(args);
  console.log(data);
 args.send(data);
    }
);
}

//add a listening regex and a corresponding callback
}());
