(function () {
//add a bot command
bot.addCommand({
    name : 'python',
    fun : spanish,

    //permissions object (can be ommitted for all-can-use, all-can-del)
    permissions : {
        use : 'ALL' ,
        del : 'NONE' 
    },
    description : 'python compiler',

    //whether the command is asynchronous or not (default false)
    async : true
});

function spanish (args, cb) {
console.log(args, "args");
$.post(
    'http://ccinc.host56.com/python.php', {sourceCode : args},
	       
    function(data){
console.log(args, "args");
	console.log(data);
args.send(data);
    }
);

}

//add a listening regex and a corresponding callback
}());
