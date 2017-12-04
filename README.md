# drfile 

[![npm](https://img.shields.io/badge/npm-v0.2.0-blue.svg)](https://www.npmjs.com/package/json2api)

Create a mock server using json files and proxy remote host.

## Installation

```
sudo npm i json2api -g
```
## Usage

```bash
json2api [options] <source>

选项：
  --config       JSON 配置文件的路径
  --port, -p     设置本地端口                                     [默认值: 3333]
  --host, -H     设置本地host                               [默认值: "0.0.0.0"]
  --remote, -R   设置转发接口(绝对路径)              [默认值: "http://127.0.0.1"]
  --watch, -w    监听文件                                  [布尔] [默认值: true]
  --help, -h     显示帮助信息                                             [布尔]
  --version, -v  显示版本号                                               [布尔]

示例：
  json2api mockdir

welcome!!

Missing <source> argument

```