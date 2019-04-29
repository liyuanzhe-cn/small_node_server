const http = require('http');
const globalConfig = require('./config');
const url = require('url');
const fs = require('fs');
const loader = require('./loader');
const filterSet = require('./filterLoader');
const log = require('./logs')


http.createServer((req, res) => {
    var pathName = url.parse(req.url).pathname;
    // console.log({ query: query, pathname: pathName })
    
    //执行拦截
    for (var i = 0; i < filterSet.length; i++){
        var flag = filterSet[i](req, res);
        if (!flag) {
            return;
        }
    }


    var isStatic = isStaticRequest(pathName)
    // console.log(isStatic)
    if (isStatic) {
        try {
            var pageData = fs.readFileSync(globalConfig.path_page+req.url)
            res.writeHead('200');
            res.write(pageData);
            res.end()
        } catch{
            res.writeHead('404');
            res.write('<html><body>404</body></html>');
            res.end()
        }
    } else {
        log(pathName);
        if (loader.get(pathName) != null) {
            try {
                loader.get(pathName)(req, res)
            } catch{
                res.writeHead('500')
                res.write('<html><body>500 BadServer</body></html>');
                res.end()
            }
        } else {
            res.writeHead('404')
            res.write('<html><body>404</body></html>');
            res.end()
        }
    }
    
}).listen(globalConfig['port']);
log('服务已经启动')

var isStaticRequest = (params) => {
    for (var i = 0; i < globalConfig.static_file_type.length; i++){
        var static = globalConfig.static_file_type[i]
        if (params.indexOf(static) == params.length - static.length) {
            return true;
        }
    }
    return false;
}