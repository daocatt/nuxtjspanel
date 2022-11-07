/**
 * 判断是否为浏览器
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function inBrowser() {
  return typeof window !== 'undefined';
}

/**
 * 判断是否在数组里存在
 * @param  {[type]}  value [description]
 * @param  {[type]}  array [description]
 * @return {Boolean}       [description]
 */
function inArray(value, array) {
  return array.includes(value) !== -1;
}

/**
 * 存储缓存
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
function setCache(key, value) {
  localStorage.setItem(key, value);
}

/**
 * 设置缓存
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getCache(key) {
  return localStorage.getItem(key);
}

/**
 * 设置Token
 * @param {[type]} value [description]
 */
function setToken(value) {
  localStorage.setItem('_eshop_token_', value);
}

/**
 * 获取Token
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function getToken() {
  return localStorage.getItem('_eshop_token_');
}

/**
 * 删除Token
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function removeToken() {
  localStorage.removeItem('_eshop_token_');
}

/**
 *考虑到圆形结构,深度复制给定对象。
 *这个函数缓存所有嵌套的对象及其副本。
 *如果检测到循环结构，使用缓存副本避免无限循环。
 * @param  {[type]} obj   [description]
 * @param  {Array}  cache [description]
 * @return {[type]}       [description]
 */
function copyData(obj, cache = []) {
  // 如果obj是不可变值，就返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 如果obj被击中，则为圆形结构
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // 先把副本放到缓存里
  // 因为我们想在copyData递归中引用它
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = copyData(obj[key], cache);
  });

  return copy;
}

/**
 * 获取第一
 * @param  {[type]}  data     [description]
 * @param  {Boolean} isError [description]
 * @return {[type]}           [description]
 */
function getShift(data, isError = false) {
  if (data) {
    return Object.keys(data).shift();
  } else {
    return false;
  }
}

/**
 * 事件绑定
 * @param {any} element  绑定dom
 * @param {any} event    事件类型
 * @param {any} listener 方法
 */
function addEvent(element, event, listener, bubble = false) {
  if (element.addEventListener) {
    element.addEventListener(event, listener, bubble);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, listener);
  } else {
    element['on' + event] = listener;
  }
}

/**
 * 判断你是否为空
 * @param  {[type]} $obj [description]
 * @return {[type]}      [description]
 */
function Empty($obj) {
  // 检验非数组/对象类型  EX：undefined   null  ''  根据自身要求添加其他适合的为空的值  如：0 ,'0','  '  等
  if (!$obj && $obj !== 0 && $obj !== '') return true;
  if (typeof $obj === 'string') {
    // 移除字符串中所有 ''
    $obj = $obj.replace(/\s*/g, '');
    if ($obj === '') return true;
  }
  return (
    (Array.isArray($obj) && $obj.length === 0) || 
    (Object.prototype.isPrototypeOf.call($obj) && Object.keys($obj).length === 0)
  );
}

/**
 * 获取实例化
 * @param  {[type]} component [description]
 * @param  {Object} props     [description]
 * @param  {Object} data      [description]
 * @param  {[type]} parent    [description]
 * @param  {[type]} el        [description]
 * @return {[type]}           [description]
 */
function getInstance(Component, props = {}, options = {}) {
  const instance = new Component({
    propsData: props,
    parent: options.parent || null,
    data() {
      return options.data || {};
    },
    el: options.el || document.createElement('div')
  });
  return instance;
}

function indexOf(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}

function arrayRemove(arr, val) {
  const index = indexOf(arr, val);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

/**
 * 获取路由参数
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

/**
 * 特殊字符转义
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function filter(str) {
  // 隐式转换
  str += '';
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
}

/**
 * 处理对象转URL参数
 * @param  {[type]} paramObj [description]
 * @return {[type]}          [description]
 */
function formateObjToParamStr(paramObj) {
  const sdata = [];
  for (const attr in paramObj) {
    sdata.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return sdata.join('&');
}

/**
 * 深度克隆
 * @param  {[type]} obj [description]
 * @return {[type]}          [description]
 */
function deepClone(obj) {
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj;
  }
  const o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj,i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

// HTML反转义
function HTMLDecode(text) {
  let temp = document.createElement('div');
  temp.innerHTML = text;
  const output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}

// HTML转义
function HTMLEncode(html) {
  let temp = document.createElement('div');
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html);
  const output = temp.innerHTML;
  temp = null;
  return output;
}

export default {
  inBrowser,
  inArray,
  setCache,
  getCache,
  setToken,
  getToken,
  removeToken,
  copyData,
  getShift,
  addEvent,
  Empty,
  getInstance,
  arrayRemove,
  getQueryVariable,
  filter,
  formateObjToParamStr,
  deepClone,
  HTMLDecode,
  HTMLEncode
};
