const glob = require('glob');

function generate(dir){
	glob(dir, function (er, files) {
		files.forEach(function(item){
			console.log(item.replace(__dirname+'/mock', ''))
		})
	    console.log(files)
	})
}
generate(__dirname+"/mock/**/*.json")