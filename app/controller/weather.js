'use strict';
const _ = require('lodash');
const Controller = require('egg').Controller;

const queryConfig = ['location']; // 有效参数

class WeatherController extends Controller {
  async getWeather() {
    const { ctx } = this;
    // 将地址location作为接口参数接受和使用
    const { query } = ctx;

    // 从query中取出特定字段，然后将参数通过参数query传递给service
    let queryParam = {}
    _.each(queryConfig, config => {
      const queryData = query[config];
      if (queryData) {
        queryParam[config] = queryData;
      }
    })
    const weatherInfo = await ctx.service.weather.get(queryParam);
    ctx.body = weatherInfo;

    // 天气接口使用https://dev.heweather.com/docs/api/geo
    // 可以通过城市或地区的location Id或者经纬度来查询
  }
}

module.exports = WeatherController;
