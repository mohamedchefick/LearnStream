<script setup>
import imgTeam from '../../assets/images/imgTeam.webp'
</script>

<template>
    <div class="px-6 md:px-10 lg:px-20 py-10 bg-[#E5EEFB] pb-20">
        <div class="flex flex-col xl:flex-row justify-between items-center gap-8 xl:gap-0">
            <!-- Texte -->
            <div class="text-center xl:w-1/2">
                <div class="font-bold text-3xl sm:text-4xl text-[#0056D2] mb-5">L’équipe derrière Wisoria</div>
                <div class="font-normal text-base sm:text-lg leading-relaxed">
                    Wisora est née de l’ambition d’un groupe de passionnés qui
                     rêvaient de démocratiser l’éducation en ligne. Nous sommes
                      une équipe d’innovateurs, d’enseignants et de designers qui
                       travaillent main dans la main pour créer une expérience d’apprentissage unique.
                </div>
            </div>  
            <div class="hidden lg:block border-r-4 border-[#0056D2] h-72 rounded-full"></div>
            <!-- Image -->
            <div class="xl:w-1/3 flex justify-center">
                <img :src="imgTeam" class="w-64 xl:w-auto" alt="Pourquoi Wisoria">
            </div> 
        </div>
    </div>
</template>
