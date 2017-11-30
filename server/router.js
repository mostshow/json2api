
import Router from 'koa-router'
import fetch from 'node-fetch'
import querystring from 'querystring'
import koaBody  from'koa-body'
import fs from 'fs'
import cookie from './utils/cookie'
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

router.post('*', koaBody(), handle)
router.get('*', koaBody(), handle)

async function handle(ctx) {
	ctx.set({'Content-Type':'application/json;charset=utf-8'})
	try {
     // let arrSetCookies =[
     //  	'SID=eb18763e-9b88-4264-a6a2-1d3690f3daa4; Domain=.16.15.106; Path=/',
     //    'TICKET=284588d9-cfb8-44f0-b440-b5bad0d98955; Domain=.16.15.106; Path=/; HttpOnly',
     //    'isForceEvaluate=true; Domain=.16.15.106; Path=/'
     //     ]
		console.log(res.headers.raw()['set-cookie'])
		let json =  await readFile(__dirname+'/mock'+ctx.request.url + '.json')
		ctx.body = json.toString()
		console.log('local')

	}catch(e){

		let requestUrl = config.remoteHost + ctx.request.url
		let data = {
			method: 'post',
			mode: 'cors',
			body: querystring.stringify(ctx.request.body),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cookie': ctx.headers.cookie ? ctx.headers.cookie : ''
    		}
		}

		let res = await fetch(requestUrl, data)
		let arrSetCookies = res.headers.raw()['set-cookie']
		setCookie(arrSetCookies)
		let json = await res.json()
		ctx.body = json;
		console.log(json)
		console.log('remote')
	}

	function setCookie(arrSetCookies){

		if(!arrSetCookies){
			return;
		}

		let domain = /\w*?\.\w*$/.exec(ctx.request.host)[0];
		let cookieOptions = {
			domain : domain,
			httpOnly : false,
			path : '/',
		}

		arrSetCookies.forEach(function(str){

			let pairSplitRegExp = /; */;
			//let reg = /(?:^)(\w)*=([^;])*/;
			let pairs = str.split(pairSplitRegExp);
			let pair = pairs[0];
		    let eq_idx = pair.indexOf('=');
		    let key = pair.substr(0, eq_idx).trim()
		    let val = pair.substr(++eq_idx, pair.length).trim();
			ctx.cookies.set(key,val, cookieOptions )
		})

	}
}
export default router