# Nuxtjs Admin Panel

Build with Nuxtjs,Bootstrap


## Getting Started



### Installing



    npm install --save

run dev

    npm run dev

Listening: http://localhost:3000/


## Built With

  - [NuxtJS](https://nuxtjs.org/)
  - [Bootstrap5 & icons](https://getbootstrap.com/)
  - [Coolicons](https://coolicons.cool/)

## Apis

You need to set example apis like this:

* /api/admin.copyright/index

```
PUT
Response {status:'success',msg:'ok',data:{copyright:true}}
```
* /api/admin.login/doLogin

```
POST
Response {status:'success',data:{token:'123',appID:'123',expired_time:Timestamp}}
```
* /api/admin.permission/index

```
POST
Response {status:'success',data:{admin_name:yourname}}
```

## nuxt.config.js

```
env: {
    siteName: "管理系统",
    siteLogo: "logo.svg",//static
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    appID: '123',
    appName: 'adminsys',
    appUrl: 'http://soda.dev',
  },
  
```

appID is for check request client or anyway you like.

appUrl is the api basic url.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code
of conduct, and the process for submitting pull requests to us.


## Authors

  - **Daocatt** - *PHP developer* -
    [Suda.one](https://suda.one)


## License

MIT
