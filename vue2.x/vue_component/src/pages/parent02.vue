<template>
    <div>
        <child021 :name="name" :age="age" :height="height" @click="test"></child021>
    </div>
</template>

<script>
import child021 from '@/components/child02-1'
export default {
    components: {
        child021
    },
    data() {
        return {
            name: 'xyz',
            age: 18,
            height: 170
        }
    },
    mounted() {

    },
    methods: {
        test() {

        }
    }
}
</script>
