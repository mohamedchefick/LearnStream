<script setup>
import Header from '../Helper/Header/index.vue';
import Hero from './hero.vue';
import Plateforme from './plateforme.vue';
import Categories from './Categories.vue';
// import Temoignage from './temoignage.vue';
// import Decouvrir from './decouvrir.vue';
import OurAchievements from './OurAchievements.vue';
import Rejoin from './rejoigne.vue';
import Footer from '../Helper/Footer/index.vue';
</script>

<template>
    <div class="">
        <Header/>
        <Hero/>
        <!-- Section de découverte commentée -->
        <!-- <Decouvrir/> -->
        <Plateforme />
        <Categories />
        <OurAchievements/>
        <!-- Section de témoignage commentée -->
        <!-- <Temoignage /> -->
        <Rejoin/>
        <Footer/>
    </div>
</template>
