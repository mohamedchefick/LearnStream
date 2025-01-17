<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import imgDecouvrir1 from '../../assets/images/img-categorie1.webp'
import imgDecouvrir2 from '../../assets/images/img-categorie2.webp'
import imgDecouvrir3 from '../../assets/images/img-categorie3.webp'
import Precedent from '../../assets/icons/precedent.svg';
import Suivant from '../../assets/icons/suivant.svg';

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
    <div class="lg:h-screen px-6 sm:px-12 lg:px-24 bg-[#F6FAFF] py-10">
        <div class="md:flex justify-between items-center">
            <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5">
                Recommandés pour vous 
            <div class="flex xl:justify-end lg:me-20 mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
            </div>
        </div>
        </div>
        <!--  -->
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
        <div class="flex justify-between w-1/3 ">
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
</template>