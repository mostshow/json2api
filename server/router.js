
import Router from 'koa-router'
import fetch from 'node-fetch'
import fs from 'fs'
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
	ctx.set({'Content-Type':'application/json;'})
	try {
		const json =  await readFile(__dirname+'/mock'+ctx.request.url + '.json');
		ctx.body = json.toString()
	}catch(e){
		ctx.body = 'error'
		console.log('error')
	}
}
export default router