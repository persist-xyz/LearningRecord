<template>
    <div>
        <span>parent03</span>
        <button @click="() => changeColor()">changeColor</button>

        <child031></child031>
        <child032></child032>

    </div>
</template>

<script>
import Vue from 'vue'
import child031 from '@/components/child03-1'
import child032 from '@/components/child03-2'
export default {
    components: {
        child031,
        child032
    },
    provide() {
        return {
            theme: this
        }
    },
    data () {
        return {
            color: 'blue'
        }
    },
    methods: {
        changeColor(color) {
            if (color) {
                this.theme.color = color;
            } else {
                this.theme.color = this.theme.color === "blue" ? "red" : "blue";
            }
        }
    }
}
</script>
