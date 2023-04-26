<template>
  <main class="form-signin w-100 m-auto row">
    <div class="col-7 form-brand">

    </div>
    <div class="col-5 px-5 form-box">
      <form class="mt-5">
        <h3 class="h5 mb-3 fw-normal">
          <img class="me-1" src="~/assets/images/admin/login_icon.svg" alt="" width="48"> 管理平台
        </h3>

        <div class="form-floating">
          <input id="floatingInput" v-model="postData.username" type="text" class="form-control" name="username" placeholder="帐号">
          <label for="floatingInput">帐号</label>
        </div>
        <div class="form-floating">
          <input id="floatingPassword" v-model="postData.password" type="password" class="form-control" name="password" placeholder="密码">
          <label for="floatingPassword">密码</label>
        </div>

        <button class="w-100 btn btn-success text-white" type="button" @click="submitForm" >立即登陆</button>
        <p class="mt-5 mb-3 text-muted copyright">© {{ siteName }} 2020–<span v-text="$moment().format('YYYY')"></span></p>
        <p v-if="!copyright" :class="copyrightClass">系统未授权, 请联系客服开通</p>
      </form>
    </div>
  </main>  
</template>

<script>

export default {
  name: 'AdminLogin',
  data () {
    return {
      postData: {
        username: '',
        email: '',
        password: '',
      },
      siteName: '',
      copyright: false,
      copyrightClass: 'mt-1 text-muted copyright d-none',
    }
  },
  head() {
    return {
      title: "Login"
    };
  },
  mounted() {
    // this.getRecord();
    this.siteName = process.env.siteName;
    // this.getCopyright();
  },
  methods: {
    submitForm() {
      

      if (this.disabled) return;
      this.$sodacs
        .login('post', this.postData)
        .then(data => {
          if(data.status === 'success')
          {
            setTimeout(() => {
              this.$router.push({ path: `/dashboard` }).catch(err=>{
                console.error(err)
              });
            }, 1000);
          } else {
            this.$toast({message:data.msg?data.msg:'请求出错',duration:2});
          }
          
        })
        .catch(err => {
          if (err.data && err.data.msg) {
            this.$toast({message:err.data.msg,duration:2})
          } else {
            this.$toast({message:'系统出错',duration:2})
          }
        });
    },
    getCopyright() {
      
      this.$sodacs
        .copyright('put', {
          behavior: 'copyright'
        })
        .then(response => {
          if(response.status === 'success')
          {
            this.copyright = response.data.copyright;
            this.copyrightClass = 'mt-1 text-muted copyright';
          }
        })
        .catch(err => {
          if (err.data && err.data.message) {
            this.$toast({message:err.data.message,duration:2})
          } else {
            this.$toast({message:'系统出错啦',duration:2})
          }
        });
    }
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
