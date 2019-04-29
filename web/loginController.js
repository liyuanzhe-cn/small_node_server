const url = require('url');
const path = new Map();
const studentService = require('../services/studentServices');
const querystring = require('querystring');
const controllerSet = require('./controllersSet');

//ajax 的 post方式登陆
function loginPost(req, res) {
    var str = '';
    req.on('data', (data) => {
        str += data;
    })
    req.on('end', (err) => {
        var params = querystring.parse(str);
        console.log(params)
        studentService.queryStudentByStuNum(params.stuNum, (result) => {
            var resStr = '';
            //从数据库返回来的是数组
            //这个用在ajax请求上， 在前端用location.href写重定向 
            if (result[0].pass == params.password) {
                resStr = 'ok';
                res.writeHead(200, {'Set-Cookie': "id=" + result[0].id});
                res.write(resStr);
            } else {
                resStr = 'fail';
                res.write(resStr);
            }
            res.end();
        })
    })
    
}
path.set("/loginPost", loginPost);
controllerSet.addToControllersForLogin("/loginPost")

// form表单的post方式登陆
function loginPostForm(req, res) {
    var str = '';
    req.on('data', (data) => {
        str += data;
    })
    req.on('end', (err) => {
        var params = querystring.parse(str);
        console.log(str)
        studentService.queryStudentByStuNum(params.stuNum, (result) => {
            //从数据库返回来的是数组
            if (result[0].pass == params.password) {
                //如果是form表单的话用这个 302重定向
                res.writeHead(302, { "location": '/main.html', "Set-Cookie":"id="+result[0].id })
            } else {
                res.writeHead(302, { "location": '/error.html' })
            }
            res.end();
        })
    })

}

path.set("/loginPostForm", loginPostForm);
controllerSet.addToControllersForLogin("/loginPostForm")

module.exports.path = path; 