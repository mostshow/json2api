
// import 'babel-register'

const Koa = require('koa')
const cors= require('koa-cors')
const convert = require('koa-convert')

const router = require('./router')
const config= require('./config')

const app = new Koa();
app.use(convert(cors()))
// app.use(bodyParser())
app.use(router.routes())
.use(router.allowedMethods())


app.listen(config.httpPort, () => {
    console.log("You can debug your app with http://" + config.localhost + ':' +config.httpPort );
});