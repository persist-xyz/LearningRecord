<template>
  <div class="hello">
    <h4> child03-1 </h4>
    <child311></child311>
    <child312></child312>
  </div>
</template>

<script>
import child311 from "./child03-1-1";
import child312 from "./child03-1-2";
export default {
  name: 'child031',
  components: {
    child311,
    child312
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
