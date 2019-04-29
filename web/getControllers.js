const url = require('url');
const path = new Map();
const studentService = require('../services/studentServices');
const controllerSet = require('./controllersSet');

//controller层的get类的方法
//测试获取数据库全部数据（可以删除）
function getData(req, res) {
    studentService.queryAllStudent((result) => {
        res.writeHeader('200')
        var str = JSON.stringify(result)
        res.write('<html><body>' + str + '</body></html>');
        res.end()
    })
}
path.set("/getData", getData);
// controllerSet.addToControllersForLogin("/getData")

//get方式登陆
function loginGet(req, res) {
    var params = url.parse(req.url, true).query;
    studentService.queryStudentByStuNum(params.stuNum, (result) => {
        var resStr = '';
        //从数据库返回来的是数组
        //这个用在ajax请求上， 在前端用location.href写重定向 
        // console.log(result[0].pass == params.password)
        if (result[0].pass == params.password) {
            resStr = 'ok'
            res.writeHead(200, { 'Set-Cookie': "id=" + result[0].id });
        } else {
            resStr = 'fail'
        }
        res.write(resStr);
        res.end();
    })
}
path.set("/loginGet", loginGet);
controllerSet.addToControllersForLogin("/loginGet")


module.exports.path = path; 
