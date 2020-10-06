const { Service } = require('egg');

const Service = require('egg').Service;

class weatherService extends Service{
    async get() {
        // todo: 这里发起httpClient请求
        // todo: 这里封装一个拼接加密签名的函数
        return {
            data: {},
            ret_code: 0,
        }
    }
}

module.exports = weatherService;