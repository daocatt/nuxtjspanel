<template>
  <div>
    <TheHeader />
    <div class="container-fluid">
      <div class="row">
        <TheSidebar />
        <main class="col-md-10 ms-sm-auto col-lg-10 px-sm-4 py-2">
          <Nuxt />
        </main>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style>
@import '~/assets/css/dashboard.css';
</style>