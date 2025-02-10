<script setup>
import IMGFamily from '../../assets/images/img-fanily.webp';
import iconSearsh3 from '../../assets/icons/iconSearsh3.svg';
import { ref, onMounted } from 'vue';
import { apiRequest } from '../../utils/api';

const emit = defineEmits(['search', 'categorySelect']);

const searchQuery = ref('');
const categories = ref([]);

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleCategorySelect = (category) => {
  emit('categorySelect', category.name);
};

onMounted(async () => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: `courses/categories/`
    });
    
    categories.value = [
      { id: 0, name: 'Tout', color: '#000000' },
      ...response.data.map(category => ({
        id: category.id,
        name: category.name,
        color: category.color
      }))
    ];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
  }
});
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
                    v-model="searchQuery"
                    type="text" 
                    class="h-14 w-full rounded-full ps-4 pr-20 text-base" 
                    placeholder="Rechercher un cours ou un parcours..."
                    @keyup.enter="handleSearch"
                >
                <img 
                    :src="iconSearsh3" 
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                    alt="Icône de recherche"
                    @click="handleSearch"
                >
            </div>
            
            <!-- Boutons dynamiques -->
            <div class="w-full lg:w-3/4 xl:w-3/5 mt-5 flex flex-wrap justify-center gap-3">
                <button 
                    v-for="(category, index) in categories" 
                    :key="index" 
                    class="px-5 py-2 rounded-full bg-white text-base font-bold shadow-sm hover:text-white transition duration-300"
                    :style="{ color: category.color }"
                    @click="handleCategorySelect(category.name === 'Tout' ? '' : category)"
                >
                    {{ category.name }}
                </button>
            </div>
        </div>
        
    </div>
</template>
