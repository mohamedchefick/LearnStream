<script setup>
import Headers from '../../components/Helper/Header/index.vue';
import Footer from '../../components/Helper/Footer/index.vue';
import emailActivateConfirm from '../../components/login/emailActivateConfirm.vue';
import ScrollToTop from '../../components/Helper/scrollToTop.vue';  
</script>

<template>
    <Headers />
    <ScrollToTop />
    <emailActivateConfirm />
    <!-- <Footer /> -->
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
