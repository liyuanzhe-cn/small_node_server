const url = require('url');
const globalConfig = require('../config');
const controllerSet = require('../web/controllersSet');
const cookieToJson = require('../utils/cookieToJson')
// console.log(controllerSet.controllersForLogin)

//拦截器，只允许登录页面和login相关path进入内容页面
function loginFilter(request, response) {
    var pathName = url.parse(request.url).pathname;
    if (freePages.isfreePage(pathName)|| controllerSet.isPathForLogin(pathName) || isStaticRequest(pathName)) {
        console.log(pathName+' 放行')
        return true;
    }else if (request.headers.cookie) {
        var cookieJson = cookieToJson(request.headers.cookie);
        for (var i = 0; i < cookieJson.length; i++){
            if (cookieJson.id) {
                console.log('监测到cookie存在 放行 '+ pathName)
                return true;
            }
        }
    }
    console.log(pathName+' 拦截')
    response.writeHead(302, { "location": "/login.html" });
    response.end();
    return false;
}

//判断是否是除了.html以外的静态文件
var isStaticRequest = (pathname) => {
    for (var i = 0; i < globalConfig.static_file_type.length; i++) {
        var static = globalConfig.static_file_type[i];
        if (static == '.html') {
            continue
        }
        if (pathname.indexOf(static) == pathname.length - static.length) {
            return true;
        }
    }
    return false;
}
//在这里设置无需登录就可以访问的页面
var freePages = {
    freePagesList: ["/login.html", "/error.html"],
    isfreePage(pathname) {
        for (var i = 0; i < this.freePagesList.length; i++) {
            if (pathname == this.freePagesList[i]) {
                return true;
            }
        }
        return false;
    }
}

module.exports = loginFilter;