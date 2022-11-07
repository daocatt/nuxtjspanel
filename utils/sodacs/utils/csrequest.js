import Cookie from 'js-cookie';
import request from './request';
import ListToTree from './listToTree.js';
import utils from './utils.js';

class csrequest {
  // 构造函数
  constructor(config, self) {
    this.self = self;
    this.utils = utils;
    this.appID = config.appID;
    this.appUrl = config.appUrl;
    this.appName = config.appName;
    this.appConfig = this.extend(
      {
        whiteList: null,
        pagination: 'header',
        defaultRoute: null,
        loginURL: null,
        loginPath: '/login',
        loginReset: null
      },
      config.appConfig
    );
    this.authorization = true;
    this.server = request(this, self.instance);
  }

  /**
   * 获取Token
   * @param  {[type]} files [description]
   * @return {[type]}       [description]
   */
  getToken() {
    return Cookie.get('token') || '';
  }

  /**
   * 树结构处理
   * @param  {[type]} optiens [description]
   * @return {[type]}         [description]
   */
  toTree(optiens) {
    return new ListToTree(optiens);
  }

  /**
   * 执行数据搜索
   * @param  {[type]} key   搜索的字段
   * @param  {[type]} value 搜索的数值
   * @return {[type]}       [description]
   */
  arraySearch(rawData, key, value, isFull = true) {
    const greaterThanTen = rawData.filter(element => {
      if (isFull) {
        if (value instanceof Array) {
          return value.includes(element[key]);
        } else {
          return element[key] === value;
        }
      } else {
        // 转化成正则格式的字符串
        const str = ['', ...value, ''].join('.*');
        // 正则
        const reg = new RegExp(str);
        // 去匹配待查询的字符串
        return reg.test(element[key]);
      }
    });
    if (isFull && greaterThanTen.length) {
      if (value instanceof Array) {
        return greaterThanTen;
      } else {
        return greaterThanTen[0];
      }
    } else {
      return greaterThanTen;
    }
  }

  /**
   * 对象覆盖合并
   * @param  {[type]} obj1 [description]
   * @param  {[type]} obj2 [description]
   * @return {[type]}      [description]
   */
  extend(obj1, obj2) {
    for (const obj in obj2) {
      obj1[obj] = obj2[obj];
    }
    return obj1;
  }

  /**
   * 设置默认值
   * @param {[type]} key   [description]
   * @param {[type]} value [description]
   */
  setDefault(key, value) {
    try {
      if (key) {
        return key;
      } else {
        return value;
      }
    } catch (error) {
      return value;
    }
  }

  /**
   * 获取对应组件
   * @param  {[type]} id   [description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  components(id, name) {
    return this.self.component(id, name);
  }
}

export default csrequest;
