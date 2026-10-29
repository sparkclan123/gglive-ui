<template><PlayerSelection v-bind="$attrs" mode="normal" /></template>
<script>
import PlayerSelection from '../fantasy/PlayerSelection.vue';
export default { name: 'PlayerSelectionNormal', inheritAttrs: false, components: { PlayerSelection } };
</script>
