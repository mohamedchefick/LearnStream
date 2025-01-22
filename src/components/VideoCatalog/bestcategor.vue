<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import iconDesign from '../../assets/icons/iconDesign.svg';
import iconDevelop from '../../assets/icons/iconDevelop.svg';
import iconBusiness from '../../assets/icons/iconBusiness.svg';
import imgDecouvrir1 from '../../assets/images/img-categorie1.webp'
import imgDecouvrir2 from '../../assets/images/img-categorie2.webp'
import imgDecouvrir3 from '../../assets/images/img-categorie3.webp'
import imgDecouvrir4 from '../../assets/images/img-figma.webp'

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
  <div class="bg-[#F6FAFF] pb-10">
    <!-- Titre principal -->
    <div class="px-6 sm:px-12 lg:px-24 text-[#0056D2] text-xl sm:text-3xl font-bold ">
        Choisissez dans les meilleurs catégories
      <div class="flex lg:ms-20 mt-4">
        <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
      </div>
    </div>

    <!-- Liste des cours -->
    <div class="mt-6 flex flex-wrap gap-6 justify-between px-6 sm:px-12 lg:px-24">
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
  </div>
</template>
