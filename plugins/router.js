export default ({ app, store }) => {

    
    // 获取菜单的路由权限
    // 验证是否有权限跳转至目标路由
    const askForAuthPermission = (to) => {
      
      return app.context.$sodacs
        .permission('post', {
          toNmae: to.name
        }).then(data => {
          return data;
        });
       
    }

    
    
    app.router.beforeEach(async (to, from, next) => {

      const token = localStorage.getItem('auth_token') || '';
      const appID = localStorage.getItem('appID') || '';

      // 白名单列表
      const whiteNameList = [
        'Logout',
        'Help',
        'Reset_password',
        'Soda',
        'Error',
        '404',
        '403',
        '500'
      ];
      
      // 获取登录页面
      const loginPath = '/login';

      // 基本的判断菜单单是否设置了auth
      
      if (!whiteNameList.includes(to.name) && token && Object.prototype.hasOwnProperty.call(to.meta,'auth') && to.meta.auth) {
        // token 直接读取用户数据
        // permission 的判断从而显示不同的菜单


        
        
        try {
          
          const res = await askForAuthPermission(to);

          if(res.status !== 'success')
          {
            app.context.$toast({message:res.msg,duration:5});
            next({path: '/error'});
          }

          app.context.store.commit('auth/admin_name',res.data.admin_name);

        } catch (err) {
          
          let msg = err.status + ' ';
          msg += err.statusText?err.statusText:'权限验证错误';
          app.context.$toast({message:msg,duration:5});

          return;
        }

      }
        
      try {

          // 判断用户是否登陆
          if (token) {

            if (to.path === loginPath) {
              
              next({path: '/'});

            } else {
              if(!appID)
              {
                next(loginPath);
              }
              next();
            }

          } else {

            const toName = to.name;
            if ( whiteNameList.includes(toName) ) {
            
              next();

            } else if (to.path !== loginPath) {
              
              let toPath = '/';
              toPath = to.fullPath;
              next({path: loginPath, query: {redirect: toPath}});

            } else {

              next();

            }
            
          }
      } catch (error) {
          console.log('router err', error);
      }

    });

    app.router.afterEach((to,from,next) => {

      const routeList = [];
      app.router.options.routes.forEach(route => {
        if(!route.hide || route.hide === false)
        {
          routeList.push({
            name: route.name,
            path: route.path,
            meta: route.meta,
            children: route.children,
          });
        }
        
      });
      store.commit('router/routes',JSON.stringify(routeList));

    });

    
}