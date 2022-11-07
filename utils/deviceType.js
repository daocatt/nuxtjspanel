// 判断类型是自己整理的,覆盖面只涵盖我工作领域的
// 可以按需追加

/**
 *
 * @param {*} UA ,就是userAgent
 * @returns  type: 设备类型
 *           env: 访问环境(微信/微博/qq)
 *           masklayer: 就是给外部拿到判断是否显示遮罩层的,一些特殊环境要引导用户到外部去打开访问
 */

function isWechat(UA) {
  if(/MicroMessenger/i.test(UA))
  {
      return true;
  }
  return false;
}

function isWeibo(UA) {
  if(/Weibo/i.test(UA))
  {
      return true;
  }
  return false;
}

function isQQ(UA) {
  if(/QQ/i.test(UA))
  {
      return true;
  }
  return false;
}

function isMoible(UA) {
  if(/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA))
  {
      return true;
  }
  return false;
}

function isIOS(UA) {
  
    if(/iPhone|iPad|iPod/i.test(UA))
    {
        return true;
    }
    return false;
}

function isAndroid(UA) {
  if(/Android/i.test(UA))
  {
      return true;
  }
  return false;
}

export function deviceType(UA) {
  if (isMoible(UA)) {
    if (isIOS(UA)) {
      if (isWechat(UA)) {
        return {
          type: "ios",
          env: "wechat",
          masklayer: true,
        };
      }
      if (isWeibo(UA)) {
        return {
          type: "ios",
          env: "weibo",
          masklayer: true,
        };
      }
      if (isQQ(UA)) {
        return {
          type: "ios",
          env: "qq",
          masklayer: true,
        };
      }
      return {
        type: "ios",
      };
    }

    if (isAndroid(UA)) {
      if (isWechat(UA)) {
        return {
          type: "android",
          env: "wechat",
          masklayer: true,
        };
      }
      if (isWeibo(UA)) {
        return {
          type: "android",
          env: "weibo",
          masklayer: true,
        };
      }
      if (isQQ(UA)) {
        return {
          type: "android",
          env: "qq",
          masklayer: true,
        };
      }
      return {
        type: "android",
      };
    }

    return {
      type: "mobile",
    };
  } else {
    return {
      type: "pc",
    };
  }
}