<template>
    <div>
        <h4>{{choose}}</h4>
        <child01 :users='users' v-on:updateTitle="updateTitle"></child01>
    </div>
</template>

<script>
import child01 from '@/components/child01'
export default {
    components: {
        child01
    },
    data() {
        return {
            users: ['x', 'y', 'z'],
            choose: ''
        }
    },
    mounted() {

    },
    methods: {
        updateTitle (e) {
            this.choose = e + ':  I from child component'
        }
    }
}
</script>
