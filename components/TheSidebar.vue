<template>
    <nav id="sidebarMenu" class="col-sm-2 col-md-2 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky sidebar-sticky">
        <template v-for="(menu_group,index) in routes">
        <ul :key="'group_ul_'+index" class="list-unstyled ps-0">
          
          <template v-for="(menu,menu_index) in menu_group.children">
          <li :key="'menu_li_'+menu_index" v-if="!menu.hide" class="border-bottom">
            

              <router-link :to="menu.path" v-if="!menu.children" :key="'menu_'+menu_index" class="btn btn-non-toggle d-inline-flex w-100 rounded-0 align-items-center border-0">
                <CoolIcon :type="menu.meta.icon"/> {{ menu.meta.title }}
              </router-link>
              
              <button v-if="menu.children" :key="'menu_'+menu_index" class="btn btn-toggle d-inline-flex w-100 rounded-0 align-items-center border-0" :class="checkMenu(menu.name)" data-bs-toggle="collapse" :data-bs-target="'#menu-'+ menu_index +'-collapse'" :aria-expanded="checkMenuExpanded(menu.name)">
                <CoolIcon :type="menu.meta.icon"/> {{ menu.meta.title }}
              </button>

              <div :key="'menu_content_'+menu_index" v-if="menu.children" :id="'menu-' + menu_index + '-collapse'" class="collapse" :class="checkMenuContent(menu.name)">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-0">
                  <template v-for="(child_item,child_index) in menu.children">
                  <li v-if="!child_item.hide" :key="child_index" >
                    <router-link  :to="child_item.path" class="link-dark d-inline-flex text-decoration-none rounded-0 w-100">
                      <CoolIcon :type="child_item.meta.icon"/> {{ child_item.meta.title }}
                    </router-link>
                  </li>
                  </template>
                </ul>
              </div>
            
          </li>
          </template>

          <li :key="'line_'+index" class="border-top my-3" v-if="index > 0"></li>
        </ul>
        </template>
      </div>
    </nav>
</template>

<script>
export default {
    name: 'AdminSidebar',
    data(){
        return{
            routes: null,
            curRouteName: '',
        }
        
    },
    mounted() {
        this.routes = JSON.parse(this.$store.getters['router/routes']);
        this.curRouteName = this.$route.matched;
    },
    methods:{
        checkMenu(name){
          return this.curRouteName.filter(item => item.name === name).length > 0?'':'collapsed';
        },
        checkMenuExpanded(name) {
          return this.curRouteName.filter(item => item.name === name).length > 0?'true':'false';
        },
        checkMenuContent(name){
          return this.curRouteName.filter(item => item.name === name).length > 0?'show':'';
        },
    },
    watch: {
      $route(to, from) {
        // 这里可以加你监听到路由改变时要触发的方法
        this.curRouteName = to.matched;
      }
    },
}
</script>

