const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const enableDestroy = require('server-destroy')
const mockServer = require('../server')

function prettyPrint(argv, object, rules) {
  const host = argv.host === '0.0.0.0' ? 'localhost' : argv.host
  const port = argv.port
  const root = `http://${host}:${port}`
  console.log(chalk.bold(`${root} `))
}

function createApp( argv) {
  const app = mockServer.app;
  const defaultsOpts = {
    remote: argv.remote,
    source: path.join(process.cwd(), argv.source)
  }
  console.log(defaultsOpts)
  //const defaults = jsonServer.defaults(defaultsOpts)
  const router = mockServer.createRouter(defaultsOpts)

  app.use(router.allowedMethods())
     .use(router.routes())
  
  // app.use(defaults)
  return app
}

module.exports = function(argv) {
  let app
  let server
  console.log(chalk.cyan('  \\{^_^}/ hi!'))
  function start(cb) {
      app = createApp(argv)
      // app.listen(config.httpPort, () => {
      //   console.log("You can debug your app with http://" + config.localhost + ':' + config.httpPort);
      // });
      server = app.listen(argv.port, argv.host)
      enableDestroy(server)
      prettyPrint(argv)
      // cb && cb()
  }
  start()
  // Start server
  // start(() => {

  //   // Watch files
  //   // if (argv.watch) {
  //   //   console.log(chalk.gray('  Watching...'))
  //   //   console.log()
  //   //   const source = argv.source

  //   //   const watchedDir = path.dirname(source)
  //   //   let readError = false
  //   //   fs.watch(watchedDir, (event, file) => {
  //   //     if (file) {
  //   //       const watchedFile = path.resolve(watchedDir, file)
  //   //       if (watchedFile === path.resolve(source)) {
  //   //         if (is.JSON(watchedFile)) {
  //   //           let obj
  //   //           try {
  //   //             obj = jph.parse(fs.readFileSync(watchedFile))
  //   //             if (readError) {
  //   //               console.log(chalk.green(`  Read error has been fixed :)`))
  //   //               readError = false
  //   //             }
  //   //           } catch (e) {
  //   //             readError = true
  //   //             console.log(chalk.red(`  Error reading ${watchedFile}`))
  //   //             console.error(e.message)
  //   //             return
  //   //           }

  //   //           // Compare .json file content with in memory database
  //   //           const isDatabaseDifferent = !_.isEqual(obj, app.db.getState())
  //   //           if (isDatabaseDifferent) {
  //   //             console.log(chalk.gray(`  ${source} has changed, reloading...`))
  //   //             server && server.destroy()
  //   //             start()
  //   //           }
  //   //         }
  //   //       }
  //   //     }
  //   //   })
  // })
}
