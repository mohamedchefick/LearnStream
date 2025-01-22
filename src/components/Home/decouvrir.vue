<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import courseCard from '../Helper/courseCard.vue'
import { ref, onMounted } from 'vue'
import { apiRequest } from '../../utils/api'

const courses = ref([])

const fetchCourses = async () => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: 'courses/pathways/?page_size=4'
    })
    courses.value = response.data.results.map(course => ({
      img: course.image,
      title: course.title,
      category: course.category.name,
      shortdescription: course.short_description,
      rating: course.rating
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error)
  }
}

onMounted(() => {
  fetchCourses()
})
</script>

<template>
    <div class="text-center py-10 px-6 sm:px-12 lg:px-24 bg-[#F5F5F5]">
        <div class="text-[#0056D2] text-xl sm:text-2xl font-bold">
            Découvrez les meilleurs parcours
            <div class="flex justify-center mx-auto mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/5" alt="">
            </div>
        </div>
        <div class="text-[#6F6B6B] text-sm w-full sm:w-3/4 lg:w-2/5 mx-auto mt-6 sm:mt-10">
            Une sélection de nos meilleures vidéos uniquement pour vous. Que vous soyez passionné de développement, design ou intelligence artificielle, ces contenus incontournables vous aideront à enrichir vos compétences et à rester à la pointe des dernières tendances.
        </div>
        <!--  -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-14 py-10">
            <div 
                v-for="(item, index) in courses" 
                :key="index" 
            >
                <courseCard :image="item.img" :category="item.category" :title="item.title" :rating="item.rating" :shortdescription="item.shortdescription" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
