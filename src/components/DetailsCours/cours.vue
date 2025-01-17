<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import imgCour from '../../assets/images/imgCour.png'
import imgDecouvrir1 from '../../assets/images/img-categorie1.webp'
import imgDecouvrir2 from '../../assets/images/img-categorie2.webp'
import imgDecouvrir3 from '../../assets/images/img-categorie3.webp'
import Precedent from '../../assets/icons/precedent.svg';
import Suivant from '../../assets/icons/suivant.svg';
import ImgCertif from '../../assets/images/imgCertif.webp'
import link from '../../assets/icons/linke.svg'
import evaluation from '../../assets/icons/evaluation.svg'
import enseignefr from '../../assets/icons/enseignefr.svg'

const categories = ['Marketing', 'Robotique', 'Marketing', 'Design', 'Photographie', 'Data Science'];

const courses = [
    {
        img: imgDecouvrir1,
        title: 'Concevez vos sites avec HTML5 et CSS3',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir2,
        title: 'Initiez-vous au Design Thinking',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir3,
        title: 'Apprenez à coder avec Javascript',
        rating: 5.00,
        reviews: 5,
    },
]
</script>

<template>
    <div class="mt-32 px-6 sm:px-12 lg:px-24 xl:px-28 mb-20">
        <div class="">
            <div class="md:flex justify-between items-center">
            <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5">
                Ce que vous apprendrez dans ce cours
            <div class="flex xl:justify-end lg:me-20 mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
            </div>
        </div>
        </div>
                    <!-- Boutons dynamiques -->
                    <div class="w-full  mt-5 flex flex-wrap  gap-3">
                <button 
                    v-for="(category, index) in categories" 
                    :key="index" 
                    class="px-5 py-2 rounded-full bg-white text-[#0056D2] text-base font-bold shadow-sm hover:bg-[#0056D2] hover:text-white transition duration-300"
                >
                    {{ category }}
                </button>
            </div>
        <div class="flex justify-between items-center">
        <div class="text-[#6F6B6B] text-base w-1/2">
            <ul class="space-y-3">
                <ol>* Expliquer ce qu'est l'analyse des données et les étapes clés du processus d'analyse des données</ol>
                <ol>* Différencier les différents rôles liés aux données, tels que l'ingénieur de données, l'analyste de données, le scientifique de données, l'analyste commercial et l'analyste en intelligence d'affaires</ol>
                <ol>* Décrire les différents types de structures de données, de formats de fichiers et de sources de données</ol>
                <ol>* Décrire le processus d'analyse des données impliquant la collecte, le traitement, l'extraction et la visualisation des données</ol>
            </ul>
        </div>    
        <div class="w-1/2">
            <img :src="imgCour" class="" alt="">
            
        </div>
        </div>
        <div class="">
            <div class="">
                <div class="font-bold text-3xl">Détails à connaître </div>
                <div class="flex gap-10 my-6 items-center">
                    <div class="">
                        <img :src="link" class="mb-2" alt="">
                        <h1 class="font-semibold text-base">Certificat partageable</h1>
                        <h1>Ajouter à votre profil Lkd</h1>
                    </div>
                    <div class="">
                        <img :src="evaluation" class="mb-2" alt="">
                        <h1 class="font-semibold text-base">Certificat partageable</h1>
                        <h1>Ajouter à votre profil Lkd</h1>
                    </div>
                    <div class="">
                        <img :src="enseignefr" class="mb-2" alt="">
                        <h1 class="font-semibold text-base">Certificat partageable</h1>
                        <h1>Ajouter à votre profil Lkd</h1>
                    </div>
                </div>
            </div>
            <img :src="ImgCertif" alt="">
        </div>
        <div class="">
            <div class="md:flex justify-between items-center">
            <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-1/2">
                Les compétences que vous acquérrez
            <div class="flex xl:justify-end lg:me-20 mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
            </div>
        </div>
        </div>
        </div>
        <div class="">
            <h1 class="text-lg font-bold">Recommandé si vous êtes intéressé (e) par le Développement web</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 xl:gap-14 py-10">
            <div 
                v-for="(item, index) in courses" 
                :key="index" 
                class="bg-white rounded-3xl shadow-2xl hover:-translate-x-1 hover:-translate-y-1 duration-200 p-1"
            >
                <img :src="item.img" class="w-full" alt="">
                <div class="py-4 flex items-center justify-between bg-white rounded-t-full px-4">
                    <div class="flex gap-2 items-center">
                        <img v-for="i in 5" :key="i" :src="star" class="w-5" alt="">
                    </div>
                    <div>
                        {{ item.rating }} <span class="text-[#8E8888]">({{ item.reviews }})</span>
                    </div>
                </div>
                <div class="px-4">
                    <h1 class="py-4 text-start text-base font-semibold">{{ item.title }}</h1>
                </div>
                <div class="p-4 flex justify-center">
                    Lorem ipsum dolor sit amet, consecteteur adipising elit.
                </div>
            </div>
        </div>
        <!--  -->
                <!--  -->
                <div class="flex justify-between w-1/3">
            <!-- Bouton précédent -->
            <button
                @click="prevSlide"
                class="absolute right-20 bg-white shadow-md rounded-lg p-2 hover:bg-gray-100 transition hover:scale-105 transition-transform duration-300"
            >
                <img :src="Precedent" alt="Précédent" class="w-5 h-5" />
            </button>

            <!-- Bouton suivant -->
            <button
                @click="nextSlide"
                class="absolute right-10 bg-[#0056D2] shadow-md rounded-lg p-2  transition hover:scale-105 transition-transform duration-300"
            >
                <img :src="Suivant" alt="Suivant" class="w-5 h-5" />
            </button>
        </div>
        </div>

    </div>
</template>