/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as ExtendInfo from './extend';
import Cache from './cache';


class api {
  /**
   * 执行API方法
   * @param  {[type]} data   [description]
   * @param  {[type]} server [description]
   * @return {[type]}        [description]
   */
  constructor(data, csrequest) {
    // 处理cloud
    this.csrequest = csrequest;
    // 执行异步处理
    return new Promise((resolve, reject) => {
      
      // 得到数据-复制错误判断，解决异常错误问题
      this.post(data)
        .then(value => {
          return this.afterEach(value)
            .then(reverse => {
              resolve(reverse);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * 前置操作
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  beforeEach(value) {
    return new Promise((resolve, reject) => {
      try {
        // value example = {copyright: {0: "put", 1: {behavior: "copyright"}}}
        this.basics.beforeEach(value, resolve, this.csrequest);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 后置操作
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  afterEach(value) {
    return new Promise((resolve, reject) => {
      try {
        this.basics.afterEach(value, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 提交接口
   * @return {[type]} [description]
   */
  post(data) {
    // 此处执行POST提交方法
    return new Promise((resolve, reject) => {
      // 设置唯一Key
      const keys = Object.keys(data);
      // 设置事件名
      const action = keys[0] || 'defaulter';
      // 处理基础事件
      this.basics = this.getExtend(action) || this.getExtend('defaulter');
      // 处理Server
      // const server = this.csrequest.server;
      
      /**
       * 获取前置操作结果
       * @param  {Function} data).then(data [description]
       * @return {[type]}                   [description]
       */
      
      this.beforeEach(data)
        .then(value => {
          if (value) {
            const options = {
              url: value.url,
              method: value.method,
              responseType: value.responseType || '',
              headers: value.headers,
              data: value.data,
              adapter: value.responseType
                ? ''
                : Cache({
                    time: 1000
                  })
            };
            this.csrequest
              .server(options)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          } else {
            resolve(true);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getExtend(funcName) {
    
    return ExtendInfo[funcName];
  }
}

export default api;
