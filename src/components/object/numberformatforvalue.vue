<template>
    <span :style="checkNum(value)">
        {{ formatPrice(value, decimal) }}
    </span>
</template>

<script>

export default {
    props: ['value', 'decimal'],
    methods: {
        formatPrice(value, decimal) {
            var num = parseFloat(value).toFixed(decimal);
            var dcm = num.toString().split(".");
            dcm[0] = dcm[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var numm = dcm.join(".");
            return numm;
        },
        checkNum(value) {
            if (value < 0) {
                return "color: rgb(255 113 113);"
            }
            if (value > 0) {
                return "color : rgb(32 249 115)"
            }
        }
    }
}
</script>


