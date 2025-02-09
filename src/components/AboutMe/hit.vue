<script setup>
import hit from '../../assets/images/hit.webp'
</script>

<template>
    <div class="px-6 md:px-10 lg:px-20 py-10">
        <div class="flex flex-col-reverse xl:flex-row justify-between items-center gap-8 xl:gap-0">
            <!-- Image -->
            <div class="xl:w-1/3 flex justify-center">
                <img :src="hit" class="w-64 xl:w-auto" alt="Pourquoi Wisoria">
            </div> 
            <!-- Texte -->
            <div class="text-center xl:w-1/3">
                <div class="font-bold text-3xl sm:text-4xl text-[#0056D2] mb-5">Comment ça marche ?</div>
                <div class="font-normal text-base sm:text-lg leading-relaxed">
                    Explorez des cours structurés à partir des meilleures
                     vidéos YouTube, apprenez à votre rythme, suivez vos 
                     progrès et obtenez une certification pour valider vos compétences
                </div>
            </div>  
        </div>
    </div>
</template>
