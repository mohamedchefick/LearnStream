<script setup>
import Header from '../Helper/Header/index.vue';
import ImgHero from '../../assets/images/img-hero.webp';
</script>

<template>
  <main class="bg-white h-screen">
    <!-- Header -->
    <div>
      <Header />
    </div>

    <!-- Section principale -->
    <div class="flex flex-col lg:flex-row h-full">
      <!-- Texte à gauche -->
      <div class="lg:w-1/2 w-full flex flex-col lg:mt-24 px-10 lg:pl-24 space-y-6">
        <p class="text-[#C1C806] text-lg sm:text-xl font-semibold mb-4 w-full sm:w-3/4">
          Accédez à une bibliothèque de vidéos éducatives gratuites, adaptées à vos besoins
        </p>
        <p class="text-[#0056D2] text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-normal">
            Votre apprentissage, simplifié et accessible.
        </p>
        <p class="text-[#031C41] text-base sm:text-lg mb-8 leading-relaxed w-full sm:w-3/4">
          Plongez dans l'univers des technologies grâce à des vidéos éducatives soigneusement sélectionnées. Apprenez, progressez et validez vos compétences avec des certifications adaptées au numérique.
        </p>
        <div>
          <button class="bg-[#0056D2] px-8 py-5 text-white text-lg rounded-lg font-bold hover:bg-[#0042a3] transition">
            Explorer les cours
          </button>
        </div>
      </div>

<!-- Image à droite -->
<div class="lg:w-1/2 h-4/5 w-full flex items-center justify-center mt-6 lg:-mt-10">
  <img src="/src/assets/images/img-hero.webp" alt="Hero Image" class="w-full sm:w-2/3 lg:w-full h-auto object-cover rounded-lg" />
</div>

    </div>
  </main>
</template>
