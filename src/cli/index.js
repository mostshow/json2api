const updateNotifier = require('update-notifier')
const yargs = require('yargs')
const run = require('./run')
const pkg = require('../../package.json')

module.exports = function() {
  updateNotifier({ pkg }).notify()
  
  const argv = yargs
    .config('config')
    .usage('$0 [options] <source>')
    .options({
      port: {
        alias: 'p',
        description: 'Set port',
        default: 3333
      },
      host: {
        alias: 'H',
        description: 'Set host',
        default: '0.0.0.0'
      },
      remote: {
        alias: 'R',
        description: 'Set remote host',
        default: 'http://localhost'
      },
      source: {
        alias: 'S',
        description: 'Set source',
        default: 'mock'  
      },
      watch: {
        alias: 'w',
        description: 'Watch file(s)'
      },
      config: {
        alias: 'c',
        description: 'Path to config file',
        default: 'mock-server.json'
      }
    })
    .boolean('watch')
    .help('help')
    .alias('help', 'h')
    .version(pkg.version)
    .alias('version', 'v')
    .example('$0 mock', '')
    .epilog('hello!').argv
    // .require(1,'Missing <source> argument').argv
  run(argv)
}
