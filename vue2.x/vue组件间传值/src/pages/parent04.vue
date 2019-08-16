<template>
    <div>
        parent04
        <child04 ref="child04Ref"></child04>
    </div>
</template>

<script>
import child04 from '@/components/child04'
export default {
    components: {
        child04
    },
    data() {
        return {
        }
    },
    mounted() {
        const child04Ref = this.$refs.child04Ref
        console.log(child04Ref.title)
        child04Ref.sayHello()
    },
    methods: {
        
    }
}
</script>
