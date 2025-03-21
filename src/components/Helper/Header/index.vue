<script setup>
import { ref } from "vue";
import IMGLogo from "../../../assets/images/img-logo.webp"
import userDrop from "../userDrop.vue"

const showMenu = ref(false);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const closeMenu = () => {
  showMenu.value = false;
};

// Récupérer userData depuis le local storage
const userData = JSON.parse(localStorage.getItem('userData'));
</script>

<template>
  <main class="lg:border fixed top-0 left-0 z-50 w-full bg-white mb-10 shadow">
    <div class="lg:container px-8 lg:px-3 lg:mx-auto py-6 flex items-center justify-between">
      <!-- Logo -->
      <div class="">
        <router-link to="/">
          <img :src="IMGLogo" class="w-28 h-12" alt="IMGLogo">
        </router-link>
      </div>

      <!-- Menu burger -->
      <div class="lg:hidden">
        <button
          @click="toggleMenu"
          class="text-[#031C41] focus:outline-none"
          aria-label="Menu"
        >
          <svg
            v-if="!showMenu"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-8 xl:gap-16 text-lg text-[#031C41] xl:ms-8 font-normal justify-between">
        <router-link to="/"
            class="relative cursor-pointer transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-0 before:left-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            :class="{ 'font-bold': $route.path === '/' }"
          >
          Accueil
          </router-link>
          <router-link to="/courses"
            class="relative cursor-pointer transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-0 before:left-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            :class="{ 'font-bold': $route.path === '/courses' }"
          >
          Cours
          </router-link>
          <router-link
            to="/about"
            class="relative cursor-pointer transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-0 before:left-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            :class="{ 'font-bold': $route.path === '/about' }"
            >
            À propos
          </router-link>
          <router-link to="/contact"
            class="relative cursor-pointer transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bottom-0 before:left-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
            :class="{ 'font-bold': $route.path === '/contact' }"
          >
            Contact
          </router-link>
          <router-link to="/Search">
            <i class="fa-solid fa-magnifying-glass text-2xl"></i>
          </router-link>
      </nav>

      <!-- Inscription Button -->
      <template v-if="userData">
        <userDrop :image_url="userData.profile_picture || userData.picture_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" :username="userData.first_name + ' ' + userData.last_name" class="hidden lg:block" />
      </template>
      <template v-else>
        <div class="lg:flex hidden gap-2">
          <router-link to="/auth#signup"
          class="btn btn-primary px-6 py-3 rounded-full text-white font-semibold "
          >
              S'inscrire
          </router-link>
          <router-link to="/auth"
          class="btn border-2 border-[#0056D2] px-6 py-3 rounded-full text-[#0056D2] font-semibold "
          >
              Se connecter
          </router-link>
        </div>
      </template>
    </div>

    <!-- Nouveau Menu Mobile -->
    <div
      v-if="showMenu"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
      @click="closeMenu"
    >
      <div 
        class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
        @click.stop
      >
        <div class="flex justify-between items-center mb-8">
          <div v-if="userData">
            <userDrop :image_url="userData.profile_picture || userData.picture_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" :username="userData.first_name + ' ' + userData.last_name" />
          </div>
          <button @click="closeMenu" class="text-gray-500">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <router-link 
            to="/"
            @click="closeMenu"
            class="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <i class="fas fa-home text-2xl text-[#0056D2] mb-2"></i>
            <span class="text-sm font-medium">Accueil</span>
          </router-link>

          <router-link 
            to="/courses"
            @click="closeMenu"
            class="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <i class="fas fa-graduation-cap text-2xl text-[#0056D2] mb-2"></i>
            <span class="text-sm font-medium">Cours</span>
          </router-link>

          <router-link 
            to="/about"
            @click="closeMenu"
            class="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <i class="fas fa-info-circle text-2xl text-[#0056D2] mb-2"></i>
            <span class="text-sm font-medium">À propos</span>
          </router-link>

          <router-link 
            to="/contact"
            @click="closeMenu"
            class="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
          >
            <i class="fas fa-envelope text-2xl text-[#0056D2] mb-2"></i>
            <span class="text-sm font-medium">Contact</span>
          </router-link>
        </div>

        <div v-if="!userData" class="space-y-3">
          <router-link 
            to="/auth#signup"
            @click="closeMenu"
            class="block w-full bg-[#0056D2] text-white text-center py-3 rounded-xl font-medium"
          >
            S'inscrire
          </router-link>
          
          <router-link 
            to="/auth"
            @click="closeMenu"
            class="block w-full border-2 border-[#0056D2] text-[#0056D2] text-center py-3 rounded-xl font-medium"
          >
            Se connecter
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
