import Vue from 'vue';
import Message from './message';

export const toast = (props) => {
   // Vue.extend传递组件选项，返回一个组件构造函数
   const constructor = Vue.extend({
    render(h) {
      return h(Message, { props });
    },
  });
  const vm = new constructor().$mount();
  // 获取组件的DOM，将其挂载到body上
  document.body.appendChild(vm.$el);
  
  // 创建这个组件的同时返回这个组件实例，在这个实例上提供删除方法。
  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.remove(comp);
    vm.$destroy();
  };
  return comp;

};

export default toast;

