const Subscription = require('egg').Subscription;

class GetTodayWeather extends Subscription{
    // TODO: 每天5点15分，拉取当天天气信息，然后写入db中
    // TODO: 每天7点，开始推送天气信息
    static get schedule() {
        return {
            cron: '0 0 */3 * * *', // 每三小时准点执行一次
            type: 'all',
        }
    }

    async task(ctx) {

    }
}

module.exports = GetTodayWeather;