const md5 = require('blueimp-md5');
const { Service } = require('egg');

const threeDayWeatherUrl = 'https://devapi.heweather.net/v7/weather/3d';
const privateKey = '850ced8fb76b4753bbf2aa24423fe70e';
const publicKey = 'HE2010072306511785';

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

    async get() {
        const {
            ctx
        } = this;
        // todo: 这里发起httpClient请求
        // todo: 这里封装一个拼接加密签名的函数getSignature()
        
        // todo: 请求参数包括必选和可选参数，如不填写可选参数将使用其默认值，参数之间使用&进行分隔。

        // location(必选): 需要查询地区的LocationID或以逗号分隔的经度/纬度坐标（十进制），LocationID可通过城市搜索服务获取。例如： location=101010100 或 location=116.41,39.92
        // key(必选): 用户认证密钥
        // gzip、lang、unit均为可选参数
        let params = {
            // publicid: publicKey,
            location: '101021200', // 徐汇区
            key: privateKey,
            // t: Math.floor(Date.now() / 1e3),
            unit: 'm', // 度量衡单位参数选择(默认公制单位)
        };
        // params.key = this.getSignature(params, privateKey);
        let query = [];
        for (let i in params) {
            query.push(`${i}=${encodeURIComponent(params[i])}`)
        }
        let url = threeDayWeatherUrl + '?' + query.join('&');
        // const result = await ctx.curl(url);
        const result = await ctx.curl(threeDayWeatherUrl, {
            dataType: 'json',
            // dataAsQueryString: true,
            data: params,
        });
        return {
            url: url,
            params: params,
            data: result.data,
            ret_code: result.status,
        }
    }
}

module.exports = weatherService;