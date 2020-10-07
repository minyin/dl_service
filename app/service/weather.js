const { Service } = require('egg');

class weatherService extends Service{
    getSignature(parameterObject, privateKey) { // 加密签名算法
        // parameterObject为输入参数，privateKey为签名密钥（用户的认证key）

        // 创建数字签名的步骤
        // 1、将请求参数格式化为“key=value”格式，如“k1=v1”、“k2=v2”、“k3=v3”；
        // 2、去除请求参数中值为空的参数
        // 3、去除请求参数中参数为sign 的参数 ( 签名参数不参与签名算法 )
        // 4、将第3步剩余的键值对以字典序升序排列，并用 & 符号连接，如 a=1&b=2&m=3&w=4
        // 5、将第4步得到的字符串后拼接上API密钥, 假设密钥为 abc , 则 结果为: a=1&b=2&m=3&w=4abc
        // 6、将第5步得到的字符串进行MD5加密 ( 注 ：字符集为 UTF-8 )，得到签名结果
        // 7、将第6步得到的签名结果 作为参数添加至请求中，参数名为 sign, 即 sign=xxxxxxx
        var keys = [];
        for (let k in parameterObject) {
            if (k !== 'key' && k !== 'sign' && !/^\s+$/.test(k) && !/^\s+$/.test(parameterObject[k])) {
                keys.push(k);
            }
        }
      
        keys.sort();
      
        let str = '';
        for (let i in keys) {
            let k = keys[i];
            if (!/\s+/.test(parameterObject[k])) {
                str += k + '=' + parameterObject[k] + '&';
            }
        }
        str = str.substr(0, str.length - 1) + privateKey;
        return md5(str);
    }

    // async get() {
    get() {
        // todo: 这里发起httpClient请求
        // todo: 这里封装一个拼接加密签名的函数
        return {
            data: {
                weather: '明天天气晴朗',
            },
            ret_code: 0,
        }
    }
}

module.exports = weatherService;