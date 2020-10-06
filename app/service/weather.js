const { Service } = require('egg');

const service = require('egg').Service;

class weatherService extends Service{
    async get() {
        // httpClient
        // const weatherData = 
        return {
            data: {},
            ret_code: 0,
        }
    }
}

module.exports = weatherService;