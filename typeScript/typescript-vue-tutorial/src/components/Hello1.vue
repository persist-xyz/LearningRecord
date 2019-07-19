<template>
    <div>
        <div class="greeting">Hello22 {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                console.error('====' + this.enthusiasm)
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            console.error('----11')
            return Array(this.enthusiasm + 1).join('%%%%');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
    color:red;
}
</style>
