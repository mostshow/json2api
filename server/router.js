
import Router from 'koa-router'
import fetch from 'node-fetch'
import fs from 'fs'
import config from './config'

const router = new Router();
const readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

router.get('*', handle)

async function handle(ctx) {
	ctx.set({'Content-Type':'application/json;charset=utf-8'})
	try {
		const json =  await readFile(__dirname+'/mock'+ctx.request.url + '.json');
		ctx.body = json.toString()
		console.log('local')
	}catch(e){
		await fetch(config.remoteHost + ctx.request.url)
		    .then(function(res) {
		        return res.json();
		    }).then(function(json) {
				ctx.body = json;
			console.log('remote')

		    });
	}
}
export default router