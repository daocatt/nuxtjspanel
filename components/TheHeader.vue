<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        
            <div class="navbar-brand ">
                <a class="navbar-logo col-md-3 col-lg-2 me-0 px-3 fs-6 text-light" @click="router('/')">
                    <img class="me-1" src="~/assets/images/logo.svg" alt="" width="24"> {{ siteName }}
                </a>
                <button class="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            
            <div class="d-flex align-items-center">

                <div class="flex-shrink-0 dropdown">
                <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img :src="adminAvatar" alt="mdo" width="24" height="24" class="rounded-circle">
                </a>
                <ul class="dropdown-menu dropdown-menu-end text-small shadow">
                    <li><div class="dropdown-item disabled">{{ adminName }}</div></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" @click="router('/about')">关于</a></li>
                    <li><a class="dropdown-item" @click="router('/profile')">资料</a></li>
                    <li><a class="dropdown-item" @click="router('/setting')">设置</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" @click="toLogout">退出登录</a></li>
                </ul>
                </div>
            </div>
        
    </header>
</template>

<script>
export default {
    name: 'AdminHeader',
    data() {
        return {
            siteName: process.env.siteName,
            adminName: '',
            adminAvatar: '',
        }
    },
    mounted () {
        this.adminName = this.$store.getters['auth/admin_name']
        this.adminAvatar = this.$store.getters['auth/admin_avatar']
        if(!this.adminAvatar)
        {
            this.adminAvatar = require('@/static/images/avatar.jpg');
        }
    },
    methods: {
        router: function (to) {
            this.$router.push({
                path: to
            });
        },
        toLogout() {
            localStorage.clear();
            
            setTimeout(() => {
            this.$router.push({ path: `/login` }).catch(err=>{
                console.log(err);
            });
            }, 1000);
        },
    }
}
</script>

