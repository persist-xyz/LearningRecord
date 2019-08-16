<template functional>
  <div class="hello">
      <h4 :style="{color: injections.theme.color}"> child03-2-1 </h4>
  </div>
</template>

<script>
export default {
  inject: {
    theme: {
      //函数式组件取值不一样
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.injections)
  },
  methods: {
    
  }
}
</script>

<style>
</style>
