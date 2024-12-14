<template>
    <div class="bg-white w-full flex flex-col lg:flex-row items-center px-6 lg:px-20 py-12 space-y-10 lg:space-y-0 lg:space-x-10">
      <!-- Partie Texte -->
      <div class="w-full lg:w-1/2">
        <!-- Titre -->
        
        <div class="text-[0056D2] text-2xl">
            <h2 class="text-2xl lg:text-3xl font-bold text-[#0056D2] mb-6">
              Pourquoi choisir notre plateforme ?
            </h2>
            <div class="mx-auto">
                <img :src="iconDecouvrir" class="w-1/5" alt="">
            </div>
        </div>
  
        <!-- Liste des points -->
        <ul class="space-y-6 text-[#031C41]">
          <!-- Élément 1 -->
          <li class="flex items-start">
            <span class="text-[#F7B32B] text-xl font-bold mr-3">✓</span>
            <div>
              <strong class="text-[#F7B32B]">Apprentissage personnalisé :</strong>
              <p class="text-gray-600">
                Suivez des vidéos adaptées à votre niveau et vos intérêts pour progresser efficacement.
              </p>
            </div>
          </li>
          <!-- Élément 2 -->
          <li class="flex items-start">
            <span class="text-[#F7B32B] text-xl font-bold mr-3">✓</span>
            <div>
              <strong class="text-[#F7B32B]">Certifications reconnues :</strong>
              <p class="text-gray-600">
                Obtenez des certificats valorisant vos compétences auprès des employeurs.
              </p>
            </div>
          </li>
          <!-- Élément 3 -->
          <li class="flex items-start">
            <span class="text-[#F7B32B] text-xl font-bold mr-3">✓</span>
            <div>
              <strong class="text-[#F7B32B]">Communauté active :</strong>
              <p class="text-gray-600">
                Participez à des discussions et échangez avec des passionnés du numérique.
              </p>
            </div>
          </li>
        </ul>
      </div>
  
      <!-- Partie Image -->
      <div class="w-full lg:w-1/2 h-auto flex justify-center">
        <img
          :src="IMGplateforme"
          alt="Pourquoi choisir notre plateforme"
          class="w-full max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  </template>
  
<script setup>
  // Importation de l'image depuis les assets
//   import IllustrationPlateforme from '@/assets/images/img-plateforme.webp';

import IMGplateforme from '../../assets/images/img-plateforme.webp';
import iconDecouvrir from '../../assets/icons/decouvrir.svg';

</script>
  
  <style scoped>
  /* Optionnel : Vous pouvez ajouter des animations Tailwind ici */
  </style>
  