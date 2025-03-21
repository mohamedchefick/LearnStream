<script setup>
import ImgHero from '../../assets/images/img-hero.webp';
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  const userData = localStorage.getItem('userData')
  if (userData) {
    isLoggedIn.value = true
  }
})
</script>

<template>
  <main class="bg-blue-50 pt-28">
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
          <router-link 
            :to="isLoggedIn ? '/courses' : '/auth#signup'"
            class="bg-[#0056D2] py-3 lg:py-4 px-6 rounded-xl text-sm lg:text-base text-white hover:bg-[#003F9A] hover:scale-105 transition-transform duration-300"
          >
            {{ isLoggedIn ? 'Explorer les cours' : 'S\'inscrire gratuitement' }}
            <i class="ms-2 fas fa-arrow-right"></i>
          </router-link>
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
