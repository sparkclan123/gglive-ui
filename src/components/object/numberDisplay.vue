<template>
    <span :class="numberClass">{{ formattedNumber }}</span>
</template>

<script>
export default {
    name: 'NumberDisplay',
    props: {
        number: {
            type: Number,
            required: true
        }
    },
    computed: {
        formattedNumber() {
            return this.number.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
        },
        numberClass() {
            return {
                'text-green-400': this.number >= 0,
                'text-red-400': this.number < 0
            };
        }
    }
};
</script>

<style scoped>
.text-green-400 {
    color: #4caf50;
}

.text-red-400 {
    color: #f44336;
}
</style>