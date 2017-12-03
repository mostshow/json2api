
// import 'babel-register'

// import Koa from 'koa'
// import cors from'koa-cors'
// import convert from 'koa-convert';

// import router from './server/router'
// import config from './server/config'

const Koa = require('koa')
const cors= require('koa-cors')
const convert = require('koa-convert')

const router = require('./router')
const config= require('./config')

const app = new Koa();
app.use(convert(cors()))

module.exports = app

