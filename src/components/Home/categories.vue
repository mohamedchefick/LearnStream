<template>
    <div class="bg-[#ffc65564] py-12 px-6 lg:px-20">
      <!-- Titre -->
      <div class="text-[#0056D2] text-2xl mb-10">
            <h2 class="text-2xl lg:text-3xl font-bold text-[#0056D2] mb-6">
                Explorez nos catégories
                <img :src="iconDecouvrir" class="w-1/6 mt-1 ms-20" alt="">
            </h2>
            <!-- <div class="mx-auto flex">
            </div> -->
        <p class="lg:text-xs text-gray-600 xl:w-1/3 mb-6">
          Plongez dans un large éventail de vidéos conçues pour vous former aux technologies les plus innovantes.
        </p>
      </div>
  
      <!-- Grille des catégories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Catégories -->
        <div
          v-for="(categorie, index) in categories"
          :key="index"
          class="relative group p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 py-3 flex items-center justify-between cursor-pointer py-8 hover:scale-105 transition-transform duration-300"
          :class="{
            'border-[#F7B32B] bg-white': activeIndex === index,
            'hover:border-[#F7B32B] hover:bg-white': activeIndex !== index
          }"
          @mouseover="activeIndex = index"
          @mouseleave="resetActiveIndex"
        >
            
          <!-- Texte -->
          <h3 class="text-sm font-semibold text-gray-800 flex items-center gap-3">  
            <img :src="categorie.icon" alt="">  {{ categorie.name }}
          </h3>

          <!-- Icône -->

          <div class="">
            <img :src="Fleche" alt="">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Liste des catégories avec noms et icônes
  import { ref } from 'vue';
  import iconDecouvrir from '../../assets/icons/decouvrir.svg';
  import Fleche from '../../assets/icons/fleche.svg';
  import FlecheHover from '../../assets/icons/flecheHover.svg';

  import Design from '../../assets/icons/design.svg';
  import Dev from '../../assets/icons/dev.svg';
  import Data from '../../assets/icons/data.svg';
  import Cloud from '../../assets/icons/cloud.svg';
  import Mark from '../../assets/icons/mark.svg';
  import Cyber from '../../assets/icons/cyber.svg';
  import Gestion from '../../assets/icons/gestion.svg';
  import Machine from '../../assets/icons/machine.svg';
  
  // Icônes par défaut pour chaque catégorie (exemple avec des emojis ou icônes dynamiques)
  const categories = ref([
    { name: 'Design UX/UI', icon: Design },
    { name: 'Développement Web', icon: Dev },
    { name: 'Data Science', icon: Data },
    { name: 'Cloud Computing', icon: Cloud },
    { name: 'Marketing Digital', icon: Mark },
    { name: 'Cybersécurité', icon: Cyber },
    { name: 'Gestion de Projet Agile', icon: Gestion },
    { name: 'Machine Learning', icon: Machine }
  ]);
  
  // Index actif pour styliser une carte
  const activeIndex = ref(0);
  
  // Réinitialisation de l'index actif (facultatif pour conserver l'effet au survol)
  const resetActiveIndex = () => {
    activeIndex.value = 0;
  };
  </script>
  
  <style scoped>
  /* Optionnel : Ajout d'une transition douce pour le hover */
  </style>
  