<script setup>
import ImgHeroAbout from '../../assets/images/ImgHeroAbout.webp'
</script>

<template>
    <div class="h-screen flex justify-center items-center mt-28 xl:mt-10 px-6 md:px-10 lg:px-20">
        <div class="lg:flex items-center w-full max-w-7xl">
            <!-- Texte -->
            <div class="space-y-6 w-full lg:w-1/2 text-center lg:text-left mb-5">
                <div class="font-bold text-4xl md:text-5xl text-[#0056D2]">À propos</div>
                <div class="w-full md:w-4/5 font-semibold text-lg md:text-xl text-[#1E1E1E] mx-auto lg:mx-0">
                    Bienvenue sur Wisoria, votre plateforme d’apprentissage basée sur les vidéos YouTube, qui récompense vos efforts et valorise vos compétences !
                </div>
                <div class="bg-[#0056D2] font-semibold text-lg md:text-xl px-6 py-3 rounded-lg text-white inline-block">
                    <button>Voir plus</button>
                </div>
            </div>

            <!-- Image -->
            <div class="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
                <img :src="ImgHeroAbout" class="w-full max-w-xs sm:max-w-md lg:max-w-lg" alt="Image Hero About">
            </div>
        </div>
    </div>
</template>