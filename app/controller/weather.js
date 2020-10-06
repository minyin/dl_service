'use strict';

const Controller = require('egg').Controller;

class WeatherController extends Controller {
  async getWeather() {
    const { ctx } = this;
    ctx.body = 'Todo: weather';
  }
}

module.exports = WeatherController;
