<template>
  <div class="hello">
    <p>name: {{name}}</p>
    <p> child02-1 $attrs: {{$attrs}}</p>

    <child022 v-bind="$attrs"></child022>

  </div>
</template>

<script>
import child022 from "./child02-2";
export default {
  name: 'child021',
  components: {child022},
  inheritAttrs: false,
  props: {
    name: String
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$attrs)  // 存放的是父组件中绑定的非props属性
    console.log(this.$listeners)  // 存放的是父组件中绑定的非原生事件
  },
  methods: {
    
  }
}
</script>

<style>
.hello{
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
