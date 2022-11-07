<template>
  <main class="form-signin w-100 m-auto row">
    <div class="col-7 form-brand">

    </div>
    <div class="col-5 px-5 form-box">
      <form class="mt-5">
        <h3 class="h5 mb-3 fw-normal">
          <img class="me-1" src="~/assets/images/admin/login_icon.svg" alt="" width="48"> 退出登录
        </h3>

      </form>
    </div>
  </main>  
</template>

<script>

export default {
  name: 'AdminLogout',
  data () {
    return {
      postData: {
        
      },
      copyright: false,
      copyrightClass: 'mt-1 text-muted copyright d-none',
    }
  },
  head() {
    return {
      title: "Logout"
    };
  },
  mounted() {
    // this.getRecord();
    this.toLogout();
  },
  methods: {
    toLogout() {
        localStorage.clear();
        
        setTimeout(() => {
          this.$router.push({ path: `/login` }).catch(err=>{
            console.log(err);
          });
        }, 1000);
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
  background-color: #f5f5f5;
}

.login-page {
  height:100vh;
  display: flex;
  align-items: center;
}

.form-signin {
  height:100%;
}

.form-signin .form-brand {
  background:url('~/assets/images/admin/login_bg.jpg') center center no-repeat;
  background-size:cover;
}

.form-box {
  padding:28vh 110px 0 !important;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-signin .copyright {
  font-size: 0.8rem;
}

</style>
