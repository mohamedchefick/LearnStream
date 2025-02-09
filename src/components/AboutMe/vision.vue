<script setup>
import imgVision from '../../assets/images/imgVision.webp'
</script>

<template>
    <div class="px-6 md:px-10 lg:px-20 py-10">
        <div class="flex flex-col-reverse xl:flex-row justify-between items-center gap-8 xl:gap-0">
            <!-- Image -->
            <div class="xl:w-1/3 flex justify-center">
                <img :src="imgVision" class="w-64 xl:w-auto" alt="Pourquoi Wisoria">
            </div> 
            <!-- Texte -->
            <div class="text-center xl:w-1/3">
                <div class="font-bold text-3xl sm:text-4xl text-[#0056D2] mb-5">Notre Vision</div>
                <div class="font-normal text-base sm:text-lg leading-relaxed">
                    Nous aspirons à devenir une référence mondiale dans l’apprentissage en ligne,
                     en exploitant le potentiel illimité des contenus YouTube et en rendant l’éducation accessible, 
                     reconnue et gratifiante pour tous
                </div>
            </div>  
        </div>
    </div>
</template>
