var fs = require('fs');
var globalConfig = require('./config');
//日志尽量要异步，避免占用资源
var fileName = globalConfig.log_path + globalConfig.log_name;

var log = (data) => {
    // console.log(data)
    // fs.appendFile(fileName, data +'\r\n', ()=>{})
    fs.writeFile(fileName, data + '\r\n', {flag:'a'}, () => { })
}

module.exports = log;