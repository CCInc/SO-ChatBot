//execute arbitrary js code in a relatively safe environment
bot.eval = (function () {
// window.url = window.url || window.webkiturl || window.mozurl || null;

// //translation tool: https://tinker.io/b2ff5
//var worker_code = atob( 'dmfyigdsb2jhbca9ihroaxm7cgovkm1vc3qgzxh0cmegznvuy3rpb25zignvdwxkigjlihbvc3npymx5ihvuc2fmzsovcnzhcib3agl0zxkgpsb7cgknqxjyyxknicagicagicagicagica6idescgknqm9vbgvhbicgicagicagicagica6idescgknrgf0zscgicagicagicagicagica6idescgknzgvjb2rlvvjjjyagicagicagica6idescgknzgvjb2rlvvjjq29tcg9uzw50jya6idescgknzw5jb2rlvvjjjyagicagicagica6idescgknzw5jb2rlvvjjq29tcg9uzw50jya6idescgknrxjyb3inicagicagicagicagica6idescgknzxzhbccgicagicagicagicagica6idescgknrxzhbevycm9yjyagicagicagica6idescgknrnvuy3rpb24nicagicagicagica6idescgknz2xvymfsjyagicagicagicagica6idescgknsw5maw5pdhknicagicagicagica6idescgknaxngaw5pdgunicagicagicagica6idescgknaxnoyu4nicagicagicagicagica6idescgknslnpticgicagicagicagicagica6idescgkntwf0accgicagicagicagicagica6idescgkntmfojyagicagicagicagicagica6idescgkntnvtymvyjyagicagicagicagica6idescgknt2jqzwn0jyagicagicagicagica6idescgknb25tzxnzywdljyagicagicagica6idescgkncgfyc2vgbg9hdccgicagicagica6idescgkncgfyc2vjbnqnicagicagicagica6idescgkncg9zde1lc3nhz2unicagicagica6idescgknumfuz2vfcnjvcicgicagicagica6idescgknumvmzxjlbmnlrxjyb3inicagica6idescgknumvnrxhwjyagicagicagicagica6idescgknc2vszicgicagicagicagicagica6idescgknu3ryaw5njyagicagicagicagica6idescgknu3ludgf4rxjyb3inicagicagica6idescgknvhlwzuvycm9yjyagicagicagica6idescgkndw5kzwzpbmvkjyagicagicagica6idescgknvvjjrxjyb3inicagicagicagica6idescgknd2hpdgv5jyagicagicagicagica6idescgojlyogdhlwzwqgyxjyyxlzigfuzcbzagl0icovcgknqxjyyxlcdwzmzxinicagicagidogmswkcsdcbg9ijyagicagicagicagicagoiaxlaojj0zsb2f0mzjbcnjhescgicagica6idescgknrmxvyxq2nefycmf5jyagicagidogmswkcsdjbnq4qxjyyxknicagicagicagoiaxlaojj0ludde2qxjyyxknicagicagica6idescgknsw50mzjbcnjhescgicagicagidogmswkcsdvaw50oefycmf5jyagicagicagoiaxlaojj1vpbnqxnkfycmf5jyagicagica6idescgknvwluddmyqxjyyxknicagicagidogmswkcsdvaw50oensyw1wzwrbcnjhescgoiaxlaokcs8qcgl0agvzzsbwcm9wzxj0awvzigfsbg93iezgihrvigz1bmn0aw9ulib3axrob3v0ihrozw0sigegznvja2zlc3qgb2ykcwluzxhwbgljywjszsblcnjvcnmgzw51c2vzlib0b29rig1ligfib3v0idqgag91cnmgdg8gdhjhy2sgdghlc2ugznvja2vycwojzg93bi4kcwz1y2sgagvsbcbpdcbpc24ndcbmdxr1cmutchjvb2ysigj1dcb0agugzxjyb3jzihrocm93bibhcmugdw5jyxrjagfibgukcwfuzcb1bnryywnhymxllibzbybhighlywrzlxvwliblbmpveswgznv0dxjllw1liqojki8kcsdet01fegnlchrpb24nidogmswkcsdfdmvudccgicagicagidogmswkcsdnzxnzywdlrxzlbnqnidogmqp9owokwybnbg9iywwsigdsb2jhbc5fx3byb3rvx18gxs5mb3jfywnokgz1bmn0aw9uicggb2jqickgewojt2jqzwn0lmdlde93blbyb3blcnr5tmftzxmoig9iaiaplmzvckvhy2goznvuy3rpb24oihbyb3agksb7cgkjawyoicf3agl0zxkuagfzt3duuhjvcgvydhkoihbyb3agksapihskcqkjzgvszxrlig9ialsgchjvccbdowojcx0kcx0powp9ktskck9iamvjdc5kzwzpbmvqcm9wzxj0esggqxjyyxkuchjvdg90exbllcanam9pbicsihskcxdyaxrhymxloibmywxzzswkcwnvbmzpz3vyywjsztogzmfsc2uscgllbnvtcmfibgu6igzhbhnllaokcxzhbhvloiaoznvuy3rpb24gkcbvbgqgksb7cgkjcmv0dxjuigz1bmn0aw9uicggyxjnickgewojcqlpziaoihroaxmubgvuz3roid4gntawihx8ichhcmcgjiygyxjnlmxlbmd0aca+iduwmckgksb7cgkjcql0ahjvdyanrxhjzxb0aw9uoib0b28gbwfuesbpdgvtcyc7cgkjcx0kcgkjcxjldhvybibvbgquyxbwbhkoihroaxmsigfyz3vtzw50cyapowojcx07cgl9kcbbcnjhes5wcm90b3r5cguuam9pbiapkqp9ktskcihmdw5jdglvbigpewojinvzzsbzdhjpy3qiowokcxzhcibjb25zb2xlid0gewojcv9pdgvtcya6iftdlaojcwxvzya6igz1bmn0aw9ukckgewojcqljb25zb2xlll9pdgvtcy5wdxnolmfwcgx5kcbjb25zb2xlll9pdgvtcywgyxjndw1lbnrzick7cgkjfqojftskcxzhcibwid0gy29uc29szs5sb2cuymluzcggy29uc29szsapowokcwz1bmn0aw9uigv4zwmgkcbjb2rlickgewojcxzhcibyzxn1bhq7cgkjdhj5ihskcqkjcmvzdwx0id0gzxzhbcggjyj1c2ugc3ryawn0ijt1bmrlzmluzwq7xg4nicsgy29kzsapowojcx0kcqljyxrjacaoigugksb7cgkjcxjlc3vsdca9iguudg9tdhjpbmcoktskcql9cgojcxjldhvybibyzxn1bhq7cgl9cgojz2xvymfslm9ubwvzc2fnzsa9igz1bmn0aw9uicggzxzlbnqgksb7cgkjdmfyigpzb25tdhjpbmdpznkgpsbku09olnn0cmluz2lmeswglypiywnrdxaqlwojcqlyzxn1bhqgpsblegvjkcbldmvudc5kyxrhick7cgojcxzhcibzdhj1bmcgpsb7cgkjcuz1bmn0aw9uica6ihrydwusievycm9yica6ihrydwuscgkjcvvuzgvmaw5lzca6ihrydwusifjlz0v4cca6ihrydwukcql9owojcxzhcibyzxzpdmvyid0gznvuy3rpb24gkcbrzxksihzhbhvlickgewojcql2yxigdhlwzsa9icgge30gks50b1n0cmluzy5jywxskcb2ywx1zsaplnnsawnlkca4lcatmsaplaojcqkjb3v0chv0owokcqkjlypku09olnn0cmluz2lmesbkb2vzig5vdcbsawtligz1bmn0aw9ucywgzxjyb3jzlcboyu4gb3igdw5kzwzpbmvkki8kcqkjawygkcb0exbligluihn0cnvuzyb8fcb2ywx1zsahpt0gdmfsdwugksb7cgkjcqlvdxrwdxqgpsanjyarihzhbhvlowojcql9cgkjcwvsc2ugewojcqkjb3v0chv0id0gdmfsdwu7cgkjcx0kcgkjcxjldhvybibvdxrwdxq7cgkjftskcgkjcg9zde1lc3nhz2uoewojcqlhbnn3zxigoibqc29uu3ryaw5nawz5kcbyzxn1bhqsihjldml2zxigkswkcqkjbg9nicagidogannvbln0cmluz2lmesggy29uc29szs5faxrlbxmsihjldml2zxigks5zbgljzsggmswgltegkqojcx0powojftskfskoktsk' );
// var blob = new blob( [worker_code], { type : 'application/javascript' } ),
	// code_url = window.url.createobjecturl( blob );

return function ( msg ) {

try{

//console.log(args, "args");
$.post(
    'http://ccinc.host56.com/ideone.php', {sourcecode : 'console.writeline("hi");'},
	       
    function(data){
finish(data);
    }
);
}
catch(e)
{console.log(e.stack, "error stack");}

	// var timeout,
		// worker = new worker( code_url );

	// worker.onmessage = function ( evt ) {
		// finish( dressupanswer(evt.data) );
	// };

	// worker.onerror = function ( error ) {
		// finish( error.tostring() );
	// };

	//and it all boils down to this...
	worker.postmessage( msg.content.replace(/^>/, '') );

	// timeout = window.settimeout(function() {
		// finish( 'maximum execution time exceeded' );
	// }, 100 );

	function finish ( result ) {
		// cleartimeout( timeout );
		// worker.terminate();
		msg.directreply( result );
	}
};

// function dressupanswer ( answerobj ) {
	// console.log( answerobj, 'eval answerobj' );
	// var answer = answerobj.answer,
		// log = answerobj.log,
		// result;

	// result = snipandcodify( answer );

	// if ( log && log.length ) {
		// result += ' logged: ' + snipandcodify( log );
	// }

	// return result;
// }
// function snipandcodify ( str ) {
	// var ret;

	// if ( str.length > 400 ) {
		// ret = '`' +  str.slice(0, 400) + '` (snip)';
	// }
	// else {
		// ret = '`' + str +'`';
	// }

	// return ret;
// }


}());
