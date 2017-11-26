import 'babel-register'

import Koa from 'koa'
import cors from'koa-cors'
import bodyParser from'koa-bodyparser'
import router from './server/router'

const app = new Koa();
// app.use(cors())
app.use(bodyParser())
app.use(router.routes())
.use(router.allowedMethods())


app.listen(3333);