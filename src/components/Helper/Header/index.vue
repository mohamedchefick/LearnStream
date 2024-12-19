<script setup>
import { ref } from "vue";

const showMenu = ref(false);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
const closeMenu = () => {
  showMenu.value = false;
};
</script>

<template>
  <main>
    <div class="lg:container px-8 lg:px-3 lg:mx-auto py-10 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <div class="bg-[#D9D9D9] w-28 h-11 flex justify-center items-center rounded-md shadow">
          <h1 class="text-lg font-semibold">Logo</h1>
        </div>
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
      <nav class="hidden lg:flex items-center space-x-10 gap-8 text-lg text-[#031C41] xl:ms-40">
        <a
          href="#"
          class="hover:bg-[#031C41] hover:text-white py-3 rounded-full hover:px-8 text-base duration-150"
        >
          Catalogue de vidéos
        </a>
        <a
          href="#"
          class="hover:bg-[#031C41] hover:text-white py-3 rounded-full hover:px-8 text-base duration-150"
        >
          Quiz
        </a>
        <a
          href="#"
          class="hover:bg-[#031C41] hover:text-white py-3 rounded-full hover:px-8 text-base duration-150"
        >
          Certifications
        </a>
        <a
          href="#"
          class="hover:bg-[#031C41] hover:text-white py-3 rounded-full hover:px-8 text-base duration-150"
        >
          Forum
        </a>
      </nav>

      <!-- Inscription Button -->
      <router-link
        to="/connexion"
        class="bg-[#0056D2] px-6 py-3 rounded-full text-white text-base font-semibold hover:bg-[#003d99] transition duration-200 lg:flex hidden"
      >
        Connexion
      </router-link>

    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMenu"
      class="fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 flex flex-col items-center space-y-6 pt-20 md:hidden"
    >
      <!-- Close Button -->
      <button
        @click="closeMenu"
        class="absolute top-8 right-9 text-[#031C41] text-5xl font-bold"
        aria-label="Close Menu"
      >
        ×
      </button>

      <!-- Mobile Menu Links -->
      <a
        href="#"
        class="text-[#031C41] text-lg hover:text-white hover:bg-[#031C41] px-6 py-2 rounded transition duration-200"
      >
        Catalogue de vidéos
      </a>
      <a
        href="#"
        class="text-[#031C41] text-lg hover:text-white hover:bg-[#031C41] px-6 py-2 rounded transition duration-200"
      >
        Quiz
      </a>
      <a
        href="#"
        class="text-[#031C41] text-lg hover:text-white hover:bg-[#031C41] px-6 py-2 rounded transition duration-200"
      >
        Certifications
      </a>
      <a
        href="#"
        class="text-[#031C41] text-lg hover:text-white hover:bg-[#031C41] px-6 py-2 rounded transition duration-200"
      >
        Forum
      </a>
      <router-link
        to="/connexion"
        class="bg-[#0056D2] px-6 py-3 rounded-full text-white text-base font-semibold hover:bg-[#003d99] transition duration-200 lg:flex hidden"
      >
        Connexion
      </router-link>
    </div>
  </main>
</template>
