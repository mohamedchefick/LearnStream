<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import iconDesign from '../../assets/icons/iconDesign.svg';
import iconDevelop from '../../assets/icons/iconDevelop.svg';
import iconBusiness from '../../assets/icons/iconBusiness.svg';
import imgDecouvrir1 from '../../assets/images/img-categorie1.webp'
import imgDecouvrir2 from '../../assets/images/img-categorie2.webp'
import imgDecouvrir3 from '../../assets/images/img-categorie3.webp'
import imgDecouvrir4 from '../../assets/images/img-figma.webp'
import star from '../../assets/icons/star.svg'
import profil from '../../assets/icons/profil.svg'
import Precedent from '../../assets/icons/precedent.svg';
import Suivant from '../../assets/icons/suivant.svg';

// Données pour les cours
const courses2 = [
  {
    icon: iconDesign,
    title: 'Design',
    description: 'Découvrez les meilleurs cours de design de la saison pour booster vos compétences',
  },
  {
    icon: iconDevelop,
    title: 'Développement',
    description: 'Découvrez les meilleurs cours de développement pour booster vos compétences',
  },
  {
    icon: iconBusiness,
    title: 'Business',
    description: 'Découvrez les meilleurs cours de business pour booster vos compétences',
  },
];

const courses = [
    {
        img: imgDecouvrir1,
        title: 'Concevez vos sites avec HTML5 et CSS3',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 12,
        level: 'Facile'
    },
    {
        img: imgDecouvrir2,
        title: 'Initiez-vous au Design Thinking',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 6,
        level: 'Facile'
    },
    {
        img: imgDecouvrir3,
        title: 'Apprenez à coder avec Javascript',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 16,
        level: 'Moyen'
    },
    {
        img: imgDecouvrir4,
        title: 'Faites vos premiers pas avec Figma',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 10,
        level: 'Facile'
    },
    {
        img: imgDecouvrir1,
        title: 'Concevez vos sites avec HTML5 et CSS3',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 12,
        level: 'Facile'
    },
    {
        img: imgDecouvrir2,
        title: 'Initiez-vous au Design Thinking',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 6,
        level: 'Facile'
    },
    {
        img: imgDecouvrir3,
        title: 'Apprenez à coder avec Javascript',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 16,
        level: 'Moyen'
    },
    {
        img: imgDecouvrir4,
        title: 'Faites vos premiers pas avec Figma',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
        time: 10,
        level: 'Facile'
    },
]
</script>

<template>
  <div class=" px-6 sm:px-12 lg:px-24 bg-[#F6FAFF] pb-10">
    <!-- Titre principal -->
    <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5">
        Choisissez dans les meilleurs catégories
      <div class="flex xl:justify-end lg:me-20 mt-4">
        <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
      </div>
    </div>

    <!-- Liste des cours -->
    <div class="mt-6 flex flex-wrap gap-6 justify-center">
      <div 
        v-for="(course, index) in courses2" 
        :key="index" 
        class="bg-white py-16 w-full sm:w-[45%] lg:w-[28%] rounded-2xl shadow-2xl space-y-4"
      >
        <!-- Icône du cours -->
        <div class="flex justify-center">
          <img :src="course.icon" alt="" />
        </div>

        <!-- Titre du cours -->
        <div class="text-center text-xl font-semibold">{{ course.title }}</div>

        <!-- Description du cours -->
        <div class="text-center w-3/4 mx-auto text-[#696984] font-normal text-base">
          {{ course.description }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-14 py-10">
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
                    <div class="flex justify-between item pb-4">
                        <div class="font-bold text-sm">Durée : <span class="font-normal"> {{ item.time }} hr</span></div>
                        <div class="font-bold text-sm">{{ item.level }}</div>
                    </div>
                    <div class="flex gap-4 items-center">
                        <img :src="profil" class="w-8 h-8 rounded-full" alt="">
                        <h1>Par <span class="font-bold">{{ item.author }}</span></h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between w-1/3 mb-8">
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
