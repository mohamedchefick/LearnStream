<script setup>
import IMGhero2 from '../../assets/images/img-hero2.webp'
import iconSearch from '../../assets/icons/iconSearch.svg'
</script>

<template>
  <div 
    class="relative bg-cover bg-center h-screen w-full" 
    :style="{ backgroundImage: `url(${IMGhero2})` }"
  >
    <!-- Input field -->
    <div class="relative inset-0 flex items-center justify-center pt-10">
      <div class="relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <input 
          type="text" 
          placeholder="Rechercher des cours" 
          class="text-base sm:text-lg rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-12 pl-5 pr-12"
        />
        <!-- Icon inside input -->
        <img 
          :src="iconSearch" 
          class="absolute right-0 top-1/2 transform -translate-y-1/2" 
          alt="Search Icon"
        />
      </div>
    </div>
  </div>
</template>
