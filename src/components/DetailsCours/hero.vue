<script setup>
import detailsCours from '../../assets/images/img-DetailsCours.webp';
import IMGCard from '../../assets/images/img-card.webp';
</script>

<template>
  <!-- Conteneur principal -->
  <div class="relative">
    <!-- Image de fond avec texte -->
    <div
      class="h-96 xl:h-[504px] w-full bg-cover bg-center relative "
      :style="{ backgroundImage: `url(${detailsCours})` }"
    >
      <!-- Superposition de texte -->
      <div class="absolute inset-0 flex items-center bg-black bg-opacity-50">
        <div class="space-y-5 mx-6 md:mx-20">
          <h1 class="text-white text-lg md:text-4xl mt-10 px-4 font-extrabold w-full md:w-3/4">
            Faites vos premiers pas sur Figma avec John DOE
          </h1>
          <button class="bg-[#0056D2] text-white px-7 py-3 rounded-2xl font-bold">
            Commencer le cours
          </button>
        </div>
      </div>
    </div>
        <!-- Section bleue et image (placée au-dessus) -->
        <div
      class="absolute top-0 left-0 right-0 z-10 mx-6 md:mx-20 items-end flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0 mt-48"
    >
      <!-- Section bleue -->
      <div
        class="bg-[#497FEE] px-8 md:px-20 py-10 rounded-2xl flex flex-wrap lg:flex-nowrap items-start lg:items-center w-full h-40 lg:w-2/3 text-white"
      >
        <div class="w-full md:w-1/2 lg:w-1/3 mb-6 lg:mb-0">
          <h1 class="font-bold text-lg">5 modules</h1>
          <h1 class="text-sm">Obtenez un aperçu du sujet et apprenez les bases.</h1>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/3 mb-6 lg:mb-0">
          <h1 class="font-bold text-lg">Niveau</h1>
          <h1 class="text-sm">Débutant (aucune expérience requise).</h1>
        </div>
        <div class="w-full lg:w-1/3">
          <h1 class="font-bold text-lg">Programme flexible</h1>
          <h1 class="text-sm">Apprenez à votre rythme.</h1>
        </div>
      </div>
      <!-- Section image -->
      <div class="flex justify-center items-center lg:w-1/3">
        <img :src="IMGCard" class="w-full md:w-3/4 lg:w-auto h-96" alt="Card Image" />
      </div>
    </div>
  </div>
</template>
