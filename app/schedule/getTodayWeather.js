const Subscription = require('egg').Subscription;

class GetTodayWeather extends Subscription{
    // TODO: 通过数据库工具，在服务器上建立db库表，用来存储用户的地址信息，以及每天定时读取的天气信息
    // TODO: 写一个脚本，可以读写db
    // TODO: 每天5点15分，拉取当天天气信息，然后写入db中
    // TODO: 每天7点，开始推送天气信息
    static get schedule() {
        return {
            cron: '0 0 */3 * * *', // todo: 每三小时准点执行一次
            type: 'all',
        }
    }

    async task(ctx) {

    }
}

module.exports = GetTodayWeather;