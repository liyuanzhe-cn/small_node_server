var studentDao = require('../dao/studentDao');

function queryAllStudent(success) {
    studentDao.queryAllStudent(success)  
}

function queryStudentByClassAndAge(className, age, success) {
    studentDao.queryStudentByClassAndAge(className, age, success)
}

function queryStudentByStuNum(stuNum, successCallback) {
    studentDao.queryStudentByStuNum(stuNum, successCallback)
}

module.exports = {
    "queryAllStudent": queryAllStudent,
    "queryStudentByClassAndAge": queryStudentByClassAndAge,
    "queryStudentByStuNum": queryStudentByStuNum
}