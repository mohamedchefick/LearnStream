<script setup>
import Hero from './hero.vue';
import Plateforme from './plateforme.vue';
import Categories from './categories.vue';
import Temoignage from './temoignage.vue';
import Decouvrir from './decouvrir.vue';
import OurAchievements from './OurAchievements.vue';
import Rejoin from './rejoigne.vue'
import Footer from '../Helper/Footer/index.vue'
// import Login from '../Login/login.vue';
// import Register from '../Login/register.vue';
import TableauBord from '../tableau_de_bord/tableauBord.vue';
import DetailsCours from '../cours/detailsCours.vue';
import DetailsParcours from '../cours/detailsParcours.vue';
import Cours from '../cours/cours.vue';
import Profil from '../profil/profil.vue';
import Recherche from '../Recherche/recherche.vue';
</script>

<template>
    <div class="">
        <Hero/>
        <!--  -->
        <Decouvrir/>
        <!--  -->
        <Plateforme />
        <!--  -->
        <Categories />
        <!--  -->
        <OurAchievements/>
        <!--  -->
        <Temoignage />
        <!--  -->
        <Rejoin/>
        <!--  -->
        <!-- <Login /> -->
        <!--  -->
        <!-- <Register /> -->
        <!--  -->
        <TableauBord />
        <!--  -->
        <DetailsCours />
        <!--  -->
        <DetailsParcours />
        <!--  -->
        <Cours />
        <!--  -->
        <Profil />
        <!--  -->
        <Recherche />
        <!--  -->
        <Footer />
    </div>
</template>