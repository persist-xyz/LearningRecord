<template>
  <div class="hello">
    <h4 :style="{color: theme.color}"> child03-1-1 </h4>

    <button @click="handleClick">改变color为green</button>
  </div>
</template>

<script>
export default {
  name: 'child0311',
  inject: {
    theme: {
      default: () => {}
    }
  },
  mounted() {
    console.log(this.theme, '---theme')
  },
  methods: {
    handleClick () {
      if (this.theme.changeColor) {
        this.theme.changeColor("green");
      }
    }
  }
}
</script>

<style>
</style>
