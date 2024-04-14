<template>
    <span>
        {{ formatPrice(value,decimal) }}
    </span>
</template>

<script>

export default {
    props: ['value','decimal'],
        methods: {
        formatPrice(value, decimal) {
            var num =  parseFloat(value).toFixed(decimal);
            var dcm = num.toString().split(".");
            dcm[0] = dcm[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var numm = dcm.join(".");
            return numm;
        },
    }
}
</script>


