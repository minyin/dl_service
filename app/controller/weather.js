'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather() {
    const { ctx } = this;
    const weatherInfo = ctx.service.weather.get();
    ctx.body = weatherInfo;

    // todo: 天气接口使用https://dev.heweather.com/docs/api/geo
    // 可以通过城市或地区的location Id或者经纬度来查询
  }
}

module.exports = WeatherController;
