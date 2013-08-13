 (function () {
 //add a bot command
 bot.addCommand({
     name : 'csharp',
     fun : csharp,

     //permissions object (can be ommitted for all-can-use, all-can-del)
     permissions : {
         use : 'ALL' ,
         del : 'NONE' 
     },
    description : 'Translate from english to spanish',

     //whether the command is asynchronous or not (default false)
     async : false
     });

 function csharp (args, cb) {
 var text =args;
 console.log(args, "args");
 var code = "using System;using System.Collections.Generic;using System.Linq;using System.Text.RegularExpressions;" + text
 }//add a listening regex and a corresponding callback
 }());

