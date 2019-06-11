<template>
  <div class="hello">
    <h4 :style="{color: theme1.color}"> child03-1-2 </h4>
  </div>
</template>

<script>
export default {
  name: 'child0312',
  inject: {
    theme1: {
      from: 'theme',
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    
  }
}
</script>

<style>
</style>
