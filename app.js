import 'babel-register'

import Koa from 'koa'
import cors from'koa-cors'
import router from './server/router'

const app = new Koa();
// app.use(cors())
app.use(router.routes())
.use(router.allowedMethods())


app.listen(3333);