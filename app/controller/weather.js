'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather() {
    const { ctx } = this;
    ctx.body = 'Todo: weather, add Service';

    // todo: 天气接口使用https://dev.heweather.com/docs/api/geo
    // 可以通过城市或地区的location Id或者经纬度来查询
  }
}

module.exports = WeatherController;
