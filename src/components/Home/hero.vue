<script setup>
import Header from '../Helper/Header/index.vue';
import ImgHero from '../../assets/images/img-hero.webp';
</script>

<template>
  <main class="bg-white ">
    <!-- Header -->
    <div class="mb-32">
      <Header />
    </div>

    <!-- Section principale -->
    <div class="flex flex-col lg:flex-row h-full pb-20">
      <!-- Texte à gauche -->
      <div class="lg:w-1/2 w-full flex flex-col lg:mt-24 px-10 lg:pl-24 space-y-6">
        <p class="text-[#F4A002] text-lg sm:text-xl font-semibold mb-4 w-full sm:w-3/4">
          Accédez à une bibliothèque de vidéos éducatives gratuites, adaptées à vos besoins
        </p>
        <div
        class=" w-full md:hidden flex items-center justify-center lg:mt-0 mt-6"
      >
        <img
          src="/src/assets/images/img-hero.webp"
          alt="Hero Image"
          class="max-w-full lg:max-w-[80%] h-auto object-contain rounded-lg"
        />
      </div>
        <p class="text-[#0056D2] text-3xl xl:text-4xl font-extrabold mb-4 leading-normal">
            Votre apprentissage, simplifié et accessible.
        </p>
        <p class="text-[#031C41] text-base xl:text-lg mb-8 leading-relaxed w-full sm:w-3/4">
          Plongez dans l'univers des technologies grâce à des vidéos éducatives soigneusement sélectionnées. Apprenez, progressez et validez vos compétences avec des certifications adaptées au numérique.
        </p>
        <div>
          <button class="bg-[#0056D2] px-8 py-5 text-white text-lg rounded-lg font-bold hover:bg-[#0042a3] transition">
            Explorer les cours
          </button>
        </div>
      </div>

        <!-- Image à droite -->
      <div
        class="lg:w-1/2 w-full hidden md:flex items-center justify-center lg:mt-0 mt-6"
      >
        <img
          src="/src/assets/images/img-hero.webp"
          alt="Hero Image"
          class="max-w-full lg:max-w-[80%] h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  </main>
</template>
