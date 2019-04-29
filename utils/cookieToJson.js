//cookie转json的工具代码
function cookieToJson(str) {
    var cookie, cookieJson = {};
    Object.defineProperty(cookieJson, 'length', {
        value: 0,
        writable: true,
        enumerable: false
    })
    if (str) {
        var cookie = str.split('; ');
        for (var i = 0; i < cookie.length; i++) {
            var item = cookie[i].split('=');
            cookieJson[item[0]] = item[1];
            cookieJson.length++;
        }
        return cookieJson;
    }
}

module.exports = cookieToJson;