const fs = require('fs');

const globalConfig = {}
const conf = fs.readFileSync('./server.conf');
const confs = conf.toString().split('\r\n');


for (var i = 0; i < confs.length; i++){
    var tempConfig = confs[i].split('=')
    globalConfig[tempConfig[0]] = tempConfig[1]
}

if (globalConfig.static_file_type) {
    globalConfig.static_file_type = globalConfig.static_file_type.split('|')
} else {
    throw '配置文件异常，缺少static_file_typ'
}
// console.log(globalConfig)
module.exports = globalConfig