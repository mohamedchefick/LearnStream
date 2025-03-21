<script setup>
import courseCard from '../Helper/courseCard.vue'
import Precedent from '../../assets/icons/precedent.svg';
import Suivant from '../../assets/icons/suivant.svg';
import { ref, onMounted, watch } from 'vue'
import { apiRequest } from '../../utils/api'

const props = defineProps({
  query: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  }
})

const courses = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(true)

const fetchCourses = async (page = 1) => {
  try {
    loading.value = true
    let url = `courses/courses/search/?page_size=16&page=${page}`
    
    if (props.query) {
      url += `&query=${props.query}`
    }
    
    if (props.category) {
      url += `&category=${props.category}`
    }

    const response = await apiRequest({
      method: 'GET',
      url: url
    })
    courses.value = response.data.results.map(course => ({
      id: course.id,
      img: course.image || '',
      title: course.title || '',
      category: course.category.name || '',
      categoryColor: course.category.color || '',
      shortdescription: course.short_description || '',
      rating: course.rating || 0,
      duration: course.duration || 0, 
      level: course.level || 'Débutant'
    }))
    totalPages.value = Math.ceil(response.data.count / 8)
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error)
  } finally {
    loading.value = false
  }
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    await fetchCourses(currentPage.value)
  }
}

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await fetchCourses(currentPage.value)
  }
}

watch([() => props.query, () => props.category], () => {
  currentPage.value = 1
  fetchCourses()
})

onMounted(() => {
  fetchCourses()
})
</script>

<template>
  <div class="px-6 sm:px-12 lg:px-24 py-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10">
      <!-- Skeleton loader -->
      <template v-if="loading">
        <div v-for="n in 8" :key="n" class="bg-white rounded-lg shadow-md p-4 h-[400px] animate-pulse">
          <div class="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="flex justify-between mt-4">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </template>

      <!-- Empty state -->
      <template v-else-if="courses.length === 0">
        <div class="col-span-full flex flex-col h-96 items-center justify-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Aucun cours trouvé</h3>
          <p class="text-gray-600 text-center">
            Nous n'avons trouvé aucun cours correspondant à vos critères de recherche.
            <br>Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      </template>

      <!-- Actual content -->
      <template v-else>
        <div 
          v-for="(item, index) in courses" 
          :key="index"
          class="h-full"
        >
          <courseCard 
            :id="item.id"
            :image="item.img" 
            :category="item.category"
            :categoryColor="item.categoryColor"
            :title="item.title" 
            :rating="item.rating"
            :shortdescription="item.shortdescription"
            :author="item.author"
            :duration="item.duration"
            :level="item.level"
            class="h-full"
          />
        </div>
      </template>
    </div>

    <div class="flex justify-end gap-4 mt-8" v-if="courses.length > 0">
      <button
        @click="prevPage"
        :disabled="currentPage === 1 || loading"
        class="bg-white shadow-md rounded-lg p-2 hover:bg-gray-100 transition hover:scale-105 duration-300 disabled:opacity-50"
      >
        <img :src="Precedent" alt="Précédent" class="w-5 h-5" />
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages || loading"
        class="bg-[#0056D2] shadow-md rounded-lg p-2 transition hover:scale-105 duration-300 disabled:opacity-50"
      >
        <img :src="Suivant" alt="Suivant" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
