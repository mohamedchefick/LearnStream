<script setup>
import IMGFamily from '../../assets/images/img-fanily.webp';
import iconSearsh3 from '../../assets/icons/iconSearsh3.svg';

// Liste des catégories
const categories = ['Marketing', 'Robotique', 'Marketing', 'Design', 'Photographie', 'Data Science'];
</script>

<template>
    <div 
        class="h-96 bg-cover bg-center" 
        :style="{ backgroundImage: `url(${IMGFamily})` }"
    >
        <!-- Contenu principal -->
        <div class="flex-col flex items-center justify-center h-full mt-5 px-4">
            <!-- Barre de recherche -->
            <div class="relative w-full sm:w-3/4 lg:w-2/3 xl:w-[63%]">
                <input 
                    type="text" 
                    class="h-14 w-full rounded-full ps-4 pr-20 text-base" 
                    placeholder="Rechercher un cours ou un tuto"
                >
                <img 
                    :src="iconSearsh3" 
                    class="absolute right-2 top-1/2 transform -translate-y-1/2" 
                    alt="Icône de recherche"
                >
            </div>
            
            <!-- Boutons dynamiques -->
            <div class="w-full sm:w-3/4 lg:w-2/3 xl:w-[63%] mt-5 flex flex-wrap justify-center gap-3">
                <button 
                    v-for="(category, index) in categories" 
                    :key="index" 
                    class="px-5 py-2 rounded-full bg-white text-[#0056D2] text-base font-bold shadow-sm hover:bg-[#0056D2] hover:text-white transition duration-300"
                >
                    {{ category }}
                </button>
            </div>
        </div>
    </div>
</template>
