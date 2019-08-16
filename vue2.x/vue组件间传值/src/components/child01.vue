<template>
  <div class="hello">
    <ul>
      <li v-for="(list, index) in users" @click="changeTitle(list)" :key="index">{{list}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'child01',
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    changeTitle (list) {
      this.$emit('updateTitle', list)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
