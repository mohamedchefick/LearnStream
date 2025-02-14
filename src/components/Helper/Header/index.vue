<script setup>
import { ref } from "vue";
import IMGLogo from "../../../assets/images/img-logo.webp"
import Searsh from "../../../assets/icons/iconSearsh2.svg"
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

    <!-- Mobile Menu -->
    <div
      v-if="showMenu"
      class="fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 flex flex-col items-center space-y-6 pt-20 lg:hidden overflow-y-auto"
    >
      <!-- Close Button -->
      <button
        @click="closeMenu"
        class="absolute top-8 right-9 text-[#031C41] text-5xl font-bold"
        aria-label="Close Menu"
      >
        ×
      </button>

      <!-- User Profile in Mobile Menu -->
      <div v-if="userData" class="w-full flex flex-col items-center mb-6">
        <userDrop :image_url="userData.image_url" :username="userData.first_name + ' ' + userData.last_name" />
      </div>

      <!-- Mobile Menu Links -->
      <router-link 
        to="/"
        @click="closeMenu"
        class="text-[#031C41] text-xl hover:text-white hover:bg-[#031C41] px-6 py-2 rounded-full transition duration-200 w-4/5 text-center"
        :class="{ 'font-bold': $route.path === '/' }"
      >
        Accueil
      </router-link>

      <router-link
        to="/courses"
        @click="closeMenu"
        class="text-[#031C41] text-xl hover:text-white hover:bg-[#031C41] px-6 py-2 rounded-full transition duration-200 w-4/5 text-center"
        :class="{ 'font-bold': $route.path === '/courses' }"
      >
        Cours
      </router-link>

      <a
        @click="closeMenu"
        class="text-[#031C41] text-xl hover:text-white hover:bg-[#031C41] px-6 py-2 rounded-full transition duration-200 w-4/5 text-center cursor-pointer"
      >
        À propos
      </a>
      
      <router-link
        to="/contact"
        @click="closeMenu"
        class="text-[#031C41] text-xl hover:text-white hover:bg-[#031C41] px-6 py-2 rounded-full transition duration-200 w-4/5 text-center"
        :class="{ 'font-bold': $route.path === '/contact' }"
      >
        Contact
      </router-link>

      <router-link 
        to="/Search"
        @click="closeMenu"
        class="w-4/5 flex justify-center"
      >
        <img :src="Searsh" alt="Rechercher" class="w-6 h-6">
      </router-link>
          
      <router-link 
        v-if="!userData"
        to="/auth"
        @click="closeMenu"
        class="w-4/5"
      >
        <button
          class="bg-[#0056D2] px-10 py-3 rounded-full text-white text-xl font-semibold hover:bg-[#003d99] transition duration-200 w-full"
        >
          Connexion
        </button>
      </router-link>
    </div>
  </main>
</template>
