import Vue from 'vue';
import utils from './utils';
import Csrequest from './utils/csrequest.js';
import Api from './utils/api.js';


const components = {};

export default class sodacs {
  /**
   * 组建列表
   * @type {Object}
   */
  components = {};

  /**
   * 插件处理
   * @param  {[type]} files [description]
   * @return {[type]}       [description]
   */
  static plugin(files) {
    this.files = files;
  }

  /**
   * 处理Vuex
   * @param  {[type]} route [description]
   * @return {[type]}       [description]
   */
  static layout(options) {
    if (options.layout) {
      sodacs.component('__SODACS__', '__layout', options.layout);
    }
    if (options.layout) {
      sodacs.component('__SODACS__', '__login', options.login);
    }
    if (options.layout) {
      sodacs.component('__SODACS__', '__home', options.home);
    }
  }

  static component(id, name, component = '') {
    if (id === 'components') {
      Vue.component(name, component);
    } else {
      const key = id + '_' + name;
      if (id && name && component) {
        components[key] = component;
      }
      if (id && name && component === '') {
        return components[key] || false;
      }
    }
  }

  /**
   * 错误处理
   * @return {[type]} [description]
   */
  static error() {}

  /**
   * 数据库初始化，并取得数据库类实例
   * @access public
   * @param  mixed       config 连接配置
   * @param  bool|string name   连接标识 true 强制重新连接
   * @return Connection
   * @throws Error
   */
  static connect(config = {}, context) {
    try {
      
      if (config.appID === '') {
        throw new Error('appID不能为空');
      }
      if (config.appUrl === '') {
        throw new Error('appUrl不能为空');
      }
      if (!config.appConfig) {
        config.appConfig = {
          whiteList: null,
          defaultRoute: null
        };
      }
      if (!this.instance) {
        this.instance = [];
      }
      if (this.instance.includes(config.appID) === false) {
        this.instance[config.appID] = this.get_proxy(config);
      }
      this.config = config;
      this.context = context;

      return this.instance[config.appID];

    } catch (error) {
      console.error('请求报错提示', error);
    }
  }

  /**
   * 异步获取对应应用
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  static get_proxy(config) {
    const _Proxy = new Proxy(new Csrequest(config, this), {
      _upload: false,
      _validator: {},
      // 此处不能使用()=> 否者会导致get方法内的this指向为basics从而this._validator获取失败
      get: function (target, property, receiver) {
        
        if (property in target) {
          return target[property];
        } else if (property === 'then') {

            // 获取所有参数值
            let data = null;
            // 如果为文件类型则重置-否则文件无法上传
            if (this._upload) {
              data = this._validator;
              this._upload = false;
            } else {
              data = utils.copyData(this._validator);
            }
            // 清空
            this._validator = {};
            // 执行最终操作
            return argument => {
            
              // 执行操作 receiver等于当前new csrequest()实例
              const returned = new Promise((resolve, reject) => {
                new Api(data, receiver)
                  .then(value => {
                    resolve(value);
                  })
                  .catch(error => {
                    reject(error);
                  });
              });
              
              // 处理前置数据
              return returned.then(reverse => {
                return argument(reverse);
              });

            };
        } else if (property) {
          const self = this;
          if (property === 'upload') {
            self._upload = true;
          }
          if (property === 'file') {
            self._upload = true;
          }
          if (property === 'video') {
            self._upload = true;
          }
          // 此处匿名函数不能使用()=>,会导致内部arguments指向的是上一层
          return function () {
            self._validator[property] = arguments || '';
            return _Proxy;
          };
        }
        
      }
    });
    return _Proxy;
  }
}

sodacs.version = '3.0.0';

if (utils.inBrowser() && window.Vue) {
  window.Vue.use(sodacs);
}
