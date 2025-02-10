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

const fetchCourses = async (page = 1) => {
  try {
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
    </div>

    <div class="flex justify-end gap-4 mt-8">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-white shadow-md rounded-lg p-2 hover:bg-gray-100 transition hover:scale-105 duration-300 disabled:opacity-50"
      >
        <img :src="Precedent" alt="Précédent" class="w-5 h-5" />
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-[#0056D2] shadow-md rounded-lg p-2 transition hover:scale-105 duration-300 disabled:opacity-50"
      >
        <img :src="Suivant" alt="Suivant" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
