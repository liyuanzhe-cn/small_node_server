const dbutil = require('./dbutil');

//获取表中全部学生信息<慎用>
function queryAllStudent(success) {
    connection = dbutil.createConnection();
    var querySql = "select * from student";
    connection.query(querySql,  (err, data) => {
        err ? console.log(err) : successCallback(data)
        function successCallback(data) {
            console.log('成功')
            success && success(data);
        }
    })
    connection.end();
}

//根据年龄和班级查这个学生全部信息
function queryStudentByClassAndAge(className, age, success) {
    connection = dbutil.createConnection();
    // 不要这么写，容易被sql注入
    // var querySql = "select * from student where class = "+ className;
    //建议这么写
    var querySql = "select * from student where class = ? and age = ? ";
    var queryParams = [className, age]
    connection.query(querySql, queryParams, (err, data) => {
        err ? console.log(err) : successCallback(data)
        function successCallback(data) {
            success && success(data)
        }
    })
    connection.end();
}
// queryAllStudent(1904, 22)

//根据学号查数据库该学生全部信息
function queryStudentByStuNum(stuNum, success) {
    connection = dbutil.createConnection();
    var querySql = "select * from student where stu_num = ?";
    
    connection.query(querySql, stuNum, (err, data) => {
        err ? console.log(err) : successCallback(data)
        function successCallback(data) {
            success && success(data)
        }
    })
    connection.end();
}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByClassAndAge": queryStudentByClassAndAge,
    "queryStudentByStuNum": queryStudentByStuNum
}