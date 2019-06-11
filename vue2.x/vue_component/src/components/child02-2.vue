<template>
  <div class="hello">
    <p>age: {{age}}</p>
    <p> child02-2 $attrs: {{$attrs}}</p>

    <child023 v-bind="$attrs"></child023>

  </div>
</template>

<script>
import child023 from "./child02-3";
export default {
  name: 'child022',
  components: {child023},
  inheritAttrs: false,
  props: {
    age: Number
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
