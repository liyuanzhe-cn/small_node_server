const mysql = require('mysql')

//连接到数据库， 记得要先打开数据库
//每一次请求之前都打开一次连接， 每一次结束都关闭连接

function createConnection() {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: "root",
        password: "root",
        database: "school"
    })
    return connection;
}

module.exports.createConnection = createConnection;
