<script setup>
import imgOurValor from '../../assets/images/imgOurValor.webp'
</script>

<template>
    <div class="px-6 md:px-10 lg:px-20 py-10">
        <div class="flex flex-col xl:flex-row justify-between items-center gap-8 xl:gap-0">
            <!-- Texte -->
            <div class="text-center xl:w-1/3">
                <div class="font-bold text-3xl sm:text-4xl text-[#0056D2] mb-5">Nos Valeurs</div>
                <div class="font-normal text-base sm:text-lg leading-relaxed">
                    Nous rendons l’éducation accessible à tous, récompensons
                     les efforts avec des certifications et transformons
                      l’apprentissage en une expérience innovante.
                </div>
            </div>  

            <!-- Image -->
            <div class="xl:w-1/3 flex justify-center">
                <img :src="imgOurValor" class="w-64 xl:w-auto" alt="Pourquoi Wisoria">
            </div> 
        </div>
    </div>
</template>
