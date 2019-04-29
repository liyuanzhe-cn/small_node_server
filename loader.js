const fs = require('fs');
var globalConfig = require('./config')

const controllerSet = [];
var pathMap = new Map();

const files = fs.readdirSync(globalConfig['web_path']);

for (var i = 0; i < files.length; i++) {
    var temp = require('./'+ globalConfig['web_path'] + '/' + files[i]);
    if (temp.path) {
        for (var [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value)
                controllerSet.push(temp)
            } else {
                throw ('url path 异常, key已存在'+ key)
            }
        }
        
    }
}
module.exports = pathMap