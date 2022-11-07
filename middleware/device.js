import { deviceType } from "~/utils/deviceType";

export default function(context) {

    context.userAgent = process.server
        ? context.req.headers["user-agent"]
        : navigator.userAgent;
    
    context.deviceType = deviceType(context.userAgent);
    
    context.store.commit("device/deviceType", context.deviceType);
    
    // 读取参数
    // console.log(context.store.getters['device/getDeviceType'].type);
    
    //   // 若是判断UA非移动端的,就在这里做处理了..
    //   // context.redirect(status,url) 这个可以重定向到外部网站
    
    //   // 若是内部访问可以直接用router对象push
    //   if (context.deviceType.type === "pc") {
    //     // context.redirect(301,'https://wwww.baidu.com')
    //   }
    
}
