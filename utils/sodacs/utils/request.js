import axios from 'axios';

// 用于判断是否刷新
window.isReresh = false;
window.RequestList = [];
const pending = new Map();
const addPending = config => {
  const url = [config.method, config.url].join('&');
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};

const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

export default function server(options) {
  // 设置初始化URL
  axios.defaults.baseURL = options.appUrl;
  
  // 开启Session存储
  axios.defaults.withCredentials = false;
  
  // 此时超时配置的默认值是 `0`
  const axcloud = axios.create();
  
  // 覆写库的超时默认值
  // 现在，在超时前，所有请求都会等待 2.5 秒
  axcloud.defaults.timeout = 1000000;
  // 重试次数
  axcloud.defaults.retry = 1;

  axcloud.interceptors.request.use(
    config => {
      const token = localStorage.getItem('auth_token') || '';
      if (token) {
        config.headers.Authorization = 'Bearer '+token;
      }
      config.headers['SODA-TYPE'] = options.appType?options.appType:'web';
      config.headers['SODA-ID'] = options.appID;
      config.headers['SODA-SECRET'] = 'NONE';

      // 返回配置信息
      addPending(config);
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axcloud.interceptors.response.use(
    response => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return Promise.reject(response);
      }
    },
    async error => {
      switch (error.response.status) {
        // token过期，清除它,清除token信息并跳转到登录页面
        case 401: {
          const token = localStorage.getItem('auth_token') || '';
          // const refreshToken = localStorage.getItem('refresh_token') || '';
          const refreshToken = '';
          await clearPending();

          // 判断Token是否存在
          if (token && refreshToken) {
            if (!window.isReresh) {
              window.isReresh = true;
              window.RequestList = [JSON.parse(JSON.stringify(error.config))];
              
              // 先移除token
              localStorage.removeItem('auth_token');

              axcloud({
                url: options.appConfig.loginReset,
                method: 'POST',
                data: { refreshToken }
              })
                .then(value => {
                  
                  if (value.status === "success") {
                    
                    localStorage.setItem('auth_token',value.data.token);
                    localStorage.setItem('appID',value.data.appID);
                    localStorage.setItem('expired_time',value.data.expired_time);
                    

                  } else {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('appID');
                    localStorage.removeItem('expired_time');
                  }
                  location.reload();
                })
                .catch(() => {
                  localStorage.removeItem('auth_token');
                  localStorage.removeItem('appID');
                  localStorage.removeItem('expired_time');
                  location.reload();
                });
            }
          } else {
            return Promise.reject(error.response);
          }
          return;
        }
        default:
          return Promise.reject(error.response);
      }
    }
  );
  return axcloud;
}
