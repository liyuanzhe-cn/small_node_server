//用于收集和取出不需要登录权限就可以访问的内容或者操作
var controllerSet = {
    controllersForLogin: [],
    addToControllersForLogin(controller) {
        this.controllersForLogin.push(controller);
    },
    isPathForLogin(pathname) {
        for (var i = 0; i < this.controllersForLogin.length; i++){
            if (pathname == this.controllersForLogin[i]) {
                return true;
            }
        }
        return false;
    }
}

module.exports = controllerSet;