<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import courseCard from '../Helper/courseCard.vue'
import Precedent from '../../assets/icons/precedent.svg';
import Suivant from '../../assets/icons/suivant.svg';
import { ref, onMounted } from 'vue'
import { apiRequest } from '../../utils/api'
import { RouterLink } from 'vue-router';

const courses = ref([])
const currentPage = ref(1)
const totalPages = ref(1)

const fetchCourses = async (page = 1) => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: `courses/courses/?page_size=4&page=${page}`
    })
    courses.value = response.data.results.map(course => ({
      img: course.image || '',
      title: course.title || '',
      category: course.category.name || '',
      categoryColor: course.category.color || '', 
      shortdescription: course.short_description || '',
      rating: course.rating || 0,
      duration: course.duration || 0,
      level: course.level || 'Débutant'
    }))
    console.log(courses.value)
    totalPages.value = Math.ceil(response.data.count / 4)
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

onMounted(() => {
  fetchCourses()
})
</script>

<template>
    <div class="px-6 sm:px-12 lg:px-24 bg-[#F6FAFF] py-10">
        <div class="md:flex justify-between items-center">
            <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5">
                Les cours les plus populaires
                <div class="flex ms-20 mt-4">
                    <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
                </div>
            </div>
            <!-- Filters Section -->
            <div class="flex flex-wrap text-[#FFA600] gap-4 mt-4 xl:mt-0">
                <RouterLink to="/Search" class="btn bg-[#FFA600] text-white px-4 py-2 rounded-md hover:bg-[#FFA600]/80">Tous les cours</RouterLink>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10 py-10">
            <div 
                v-for="(item, index) in courses" 
                :key="index"
                class="h-full"
            >
                <courseCard 
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

        <div class="flex justify-end gap-4">
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