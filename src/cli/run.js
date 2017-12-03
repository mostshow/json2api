const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const chokidar = require('chokidar');
const glob = require('glob');

const enableDestroy = require('server-destroy')
const mockServer = require('../server')

function prettyPrint(argv) {
  const host = argv.host === '0.0.0.0' ? 'localhost' : argv.host
  const port = argv.port
  const local = `[local host] : starting app with http://${host}:${port}`
  const remote = `[remote host] : ${argv.remote}`
  const mockDir = `[mock dir] : ${argv.source}`
  console.log(chalk.green(`${local} `))
  console.log(chalk.green(`${remote} `))
  console.log(chalk.green(`${mockDir} `))
  console.log()
}

function createApp( argv) {
  const app = mockServer.app;
  const router = mockServer.createRouter(argv)

  app.use(router.allowedMethods())
     .use(router.routes())

  return app
}

module.exports = function(argv) {
  let app
  let server
  let source = argv._[0] || argv.source 
  console.log(argv._)
  argv.source = path.join(process.cwd(), source)
  function start(cb) {
      app = createApp(argv)
      server = app.listen(argv.port, argv.host)
      enableDestroy(server)
      prettyPrint(argv)
      cb && cb()
  }
  start(() => {
    //to restart at any time, enter `rs`
    console.log(
      chalk.yellowBright(
        '  Type rs + enter at any time to restart!!'
      )
    )
    console.log()
    process.stdin.on('error', () => {
      console.log(`  Error, can't read from stdin`)
    })
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', chunk => {
      if (chunk.trim().toLowerCase() === 'rs') {
        console.log(chalk.yellowBright(`  restarting...`))
        console.log()
        server && server.destroy()
        start()
      }
    })
    //watch files
    // if(argv.watch){
    //   console.log(chalk.red('  \\{^_^}/ Watching...'))
    //   console.log()
    //   let watchedDirFile = argv.source + '/**/*.json'
      
    //   let restart = false
    //   chokidar.watch( watchedDirFile , {ignored: /(^|[\/\\])\../}).on('all', (event, file) => {
    //     if(file){
    //       console.log(chalk.yellow(`  ${argv.source} has changed, restarting...`))
    //       server && server.destroy()
    //       console.log(chalk.gray(  event, file));
    //       start()
    //     }
    //   });
    // }
  })
}
