<template>
  <img class="cool-icon" :src="svgsrc" :style="`width:${size}`">
</template>

<script type="text/javascript">
export default {
  name: 'CoolIcon',
  data(){
    return {
      svgsrc: require('@/assets/coolicons/'+this.type+'.svg')
    }
  },
  props: {
    type: {
      type: String,
      default: 'modules'
    },
    size: {
      type: String,
      default: '16px;'
    }
  }
};
</script>
