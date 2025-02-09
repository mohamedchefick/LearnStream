<script setup>
import imgAssignment from '../../assets/images/imgAssignment.webp'
</script>

<template>
    <div class="bg-[#E5EEFB] px-6 md:px-10 lg:px-20">
        <div class="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-0">
            <!-- Image et barre séparatrice -->
            <div class="flex flex-col justify-center sm:flex-row items-center gap-5 sm:gap-10 w-1/2 xl:w-1/3">
                <img :src="imgAssignment" class="w-full justify-center flex" alt="Notre mission">
                <div class="hidden lg:block border-r-4 border-[#0056D2] h-72 rounded-full"></div>
            </div>

            <!-- Texte -->
            <div class="text-center xl:w-3/5 xl:px-24">
                <div class="text-[#0056D2] font-bold text-2xl sm:text-3xl mb-3">Notre mission</div>
                <div class="text-[#1E1E1E] font-semibold text-base sm:text-lg leading-relaxed">
                    Chez Wisoria, nous croyons que chaque minute passée à apprendre mérite d’être reconnue. 
                    Notre mission est d’offrir une structure organisée aux contenus éducatifs dispersés sur 
                    YouTube et de permettre à nos apprenants d’obtenir des certifications pour valider leurs compétences.
                </div>
            </div>
        </div>
    </div>
</template>
