<script setup>
import IMGFamily from '../../assets/images/img-fanily.webp';
import iconSearsh3 from '../../assets/icons/iconSearsh3.svg';
import { ref, onMounted } from 'vue';
import { apiRequest } from '../../utils/api';
import { useRoute } from 'vue-router';

const route = useRoute();
const emit = defineEmits(['search', 'categorySelect']);

const searchQuery = ref('');
const categories = ref([]);
const activeCategory = ref(route.query.category || '');
const showCategories = ref(false);

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleCategorySelect = (category) => {
  activeCategory.value = category.name;
  emit('categorySelect', category.name);
  showCategories.value = false;
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
        class="min-h-[200px] py-12 pt-32 bg-cover bg-center" 
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
            
            <!-- Catégories Desktop -->
            <div class="hidden md:flex w-full lg:w-3/4 xl:w-3/5 mt-5 flex-wrap justify-center gap-3">
                <button 
                    v-for="(category, index) in categories" 
                    :key="index" 
                    class="btn btn-ghost px-5 py-2 rounded-full text-base font-bold shadow-sm hover:bg-gray-100 transition duration-300"
                    :class="{ 'bg-white': activeCategory !== category.name, 'bg-gray-200': activeCategory === category.name }"
                    :style="{ color: category.color }"
                    @click="handleCategorySelect(category.name === 'Tout' ? '' : category)"
                >
                    {{ category.name }}
                </button>
            </div>

            <!-- Catégories Mobile -->
            <div class="md:hidden w-full mt-5 relative">
                <button 
                    @click="showCategories = !showCategories"
                    class="w-full bg-white px-4 py-3 rounded-xl flex justify-between items-center shadow-sm"
                >
                    <span>{{ activeCategory || 'Sélectionner une catégorie' }}</span>
                    <i class="fas fa-chevron-down" :class="{ 'transform rotate-180': showCategories }"></i>
                </button>

                <div v-if="showCategories" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10">
                    <button 
                        v-for="(category, index) in categories" 
                        :key="index"
                        class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        :class="{ 'bg-gray-50': activeCategory === category.name }"
                        @click="handleCategorySelect(category.name === 'Tout' ? '' : category)"
                    >
                        {{ category.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
