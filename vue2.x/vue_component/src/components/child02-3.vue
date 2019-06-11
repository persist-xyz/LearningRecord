<template>
  <div class="hello">
    <p>height: {{height}}</p>
    <p> child02-3 $attrs: {{$attrs}}</p>
  </div>
</template>

<script>
export default {
  name: 'child023',
  props: {
    height: ''
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$attrs)
  },
  methods: {
    
  }
}
</script>

<style>
</style>
