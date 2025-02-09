<script setup>
import imginterro from '../../assets/images/imginterro.webp'
</script>

<template>
    <div class="px-6 md:px-10 lg:px-20 py-10">
        <div class="flex flex-col xl:flex-row justify-between items-center gap-8 xl:gap-0">
            <!-- Texte -->
            <div class="text-center xl:w-1/3">
                <div class="font-bold text-3xl sm:text-4xl text-[#0056D2] mb-5">Pourquoi Wisoria</div>
                <div class="font-normal text-base sm:text-lg leading-relaxed">
                    Nous regroupons les meilleurs contenus pédagogiques de YouTube en parcours structurés et thématiques.
                    Vos efforts sont récompensés par des certificats reconnus, ajoutant de la valeur à vos apprentissages.
                    Rejoignez une communauté d’apprenants et de passionnés qui partagent vos ambitions.
                </div>
            </div>  

            <!-- Image -->
            <div class="xl:w-1/3 flex justify-center">
                <img :src="imginterro" class="w-64 xl:w-auto" alt="Pourquoi Wisoria">
            </div> 
        </div>
    </div>
</template>
