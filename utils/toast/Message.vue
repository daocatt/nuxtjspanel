<template>
  <div v-if="isShow" class="toast-container p-3 top-0 start-50 translate-middle-x">
    <div :class="[fadeShow?fadeShow:'', 'stay', className2]" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="close"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    type: {
      type: String,
      default:'info',
    },
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3,
    },
  },
  data () {
    return {
      isShow: false,
      className2: 'toast align-items-center border-0',
      fadeShow: '',
    };
  },
  created () {
    this.show();
  },
  methods: {
    show () {
      this.isShow = true;
      this.fadeShow = 'fade show ';
      if(this.type === 'info')
      {
        this.fadeShow += 'text-bg-light';
      }
      if(this.type === 'primary')
      {
        this.fadeShow += 'text-bg-primary';
      }
      if(this.type === 'warning')
      {
        this.fadeShow += 'text-bg-warning';
      }
      if(this.type === 'error')
      {
        this.fadeShow += 'text-bg-danger';
      }
      setTimeout(() => {
        this.isShow = false;
      }, this.duration * 1000);
    },
    close () {
      this.isShow = false;
      this.fadeShow = '';
    },
  },
};
</script>