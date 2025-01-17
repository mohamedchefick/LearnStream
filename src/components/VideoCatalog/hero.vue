<script setup>
import IMGhero2 from '../../assets/images/img-hero2.webp'
import IMGBOY from '../../assets/images/img-boy.webp'
</script>

<template>
  <div 
    class="bg-[#F5FDFF] flex justify-center px-4 lg:px-32 pt-10 lg:pt-0"
  >
    <div class="flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-10">
      <!-- Image principale -->
      <img 
        :src="IMGhero2" 
        class="w-full lg:w-1/3 h-96 lg:h-80 object-cover" 
        alt="IMGhero2" 
      />

      <!-- Texte principal -->
      <div 
        class="font-extrabold text-xl lg:text-3xl text-[#0056D2] text-center lg:w-2/3 px-2"
      >
        Découvrez nos nouveaux contenus en développement web
      </div>

      <!-- Image secondaire -->
      <div class="w-full lg:w-2/5 lg:flex hidden">
        <img 
          :src="IMGBOY" 
          class="w-full h-40 lg:h-80 object-cover" 
          alt="IMGhero2"
        />
      </div>
    </div>
  </div>
</template>

