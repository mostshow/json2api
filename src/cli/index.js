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
        description: '设置本地port',
        default: 3333
      },
      host: {
        alias: 'H',
        description: '设置本地host',
        default: '0.0.0.0'
      },
      remote: {
        alias: 'R',
        description: '设置转发url(绝对路径)',
        default: 'http://127.0.0.1'
      },
      source: {
        alias: 'S',
        description: '设置多个需要mock的目录',
        default: 'mock'
      },
      watch: {
        alias: 'w',
        description: '监听文件',
        default: true
      },
      log: {
        alias: 'l',
        description: '输出日志',
        default: false
      }
    })
    .boolean('watch')
    .boolean('log')
    .help('help')
    .alias('help', 'h')
    .version(pkg.version)
    .alias('version', 'v')
    .example('$0 mockdir', '')
    .epilog('welcome!!')
    .require(1,'Missing <source> argument').argv
  run(argv)
}
