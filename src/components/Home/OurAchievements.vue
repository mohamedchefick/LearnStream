<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import IMGgirl from '../../assets/images/img-student.webp'
import instructeur from '../../assets/icons/instructeur.svg'
import etudiants from '../../assets/icons/etudiants.svg'
import videos from '../../assets/icons/videos.svg'
import utilisateurs from '../../assets/icons/utilisateurs.svg'
import { apiRequest } from '../../utils/api'
import { ref } from 'vue'

const stats = ref({
  users: 0,
  courses: 0,
  lessons: 0,
  chapters: 0
})

const fetchStats = async () => {
  try {
    const response = await apiRequest({ 
      method: 'GET', 
      url: `administration/statistics/` 
    });
    stats.value = {
      users: response.data.users.total,
      courses: response.data.courses.total,
      lessons: response.data.lessons.total,
      chapters: response.data.chapters.total
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
  }
}

fetchStats()
</script>

<template>
  <div class="py-10 px-6 sm:px-12 lg:px-24">
    <!-- Section Titre -->
    <div class="text-[#0056D2] text-xl sm:text-2xl font-bold text-center lg:text-left -mb-20">
      Nos réalisations
      <div class="flex ms-4 mt-4">
        <img :src="iconDecouvrir" class="w-40" alt="Icône Découvrir">
      </div>
    </div>

    <!-- Section Contenu -->
    <div class="flex flex-col-reverse lg:flex-row justify-between items-center mt-10  xl:mt-0 gap-10">
      <!-- Section Statistiques -->
      <div class="grid sm:grid-cols-2 gap-6 lg:gap-10 w-full lg:w-3/5 px-4 lg:px-0">
        <!-- Instructeurs -->
        <div class="flex gap-3 items-center">
          <img :src="instructeur" class="w-20 sm:w-12 lg:w-16" alt="Icône Instructeurs">
          <div>
            <h1 class="text-xl font-bold">{{ stats.courses }}+</h1>
            <h1 class="text-lg text-[#6D737A]">Cours</h1>
          </div>
        </div>
        <!-- Étudiants -->
        <!-- <div class="flex gap-3 items-center">
          <img :src="etudiants" class="w-20 sm:w-12 lg:w-16" alt="Icône Étudiants">
          <div>
            <h1 class="text-xl font-bold">{{ stats.users }}</h1>
            <h1 class="text-lg text-[#6D737A]">Utilisateurs</h1>
          </div>
        </div> -->
        <!-- Vidéos -->
        <div class="flex gap-3 items-center">
          <img :src="videos" class="w-20 sm:w-12 lg:w-16" alt="Icône Vidéos">
          <div>
            <h1 class="text-xl font-bold">{{ stats.lessons }}+</h1>
            <h1 class="text-lg text-[#6D737A]">Leçons</h1>
          </div>
        </div>
        <!-- Utilisateurs -->
        <div class="flex gap-3 items-center">
          <img :src="utilisateurs" class="w-20 sm:w-12 lg:w-16" alt="Icône Utilisateurs">
          <div>
            <h1 class="text-xl font-bold">{{ stats.users }}+</h1>
            <h1 class="text-lg text-[#6D737A]">Utilisateurs</h1>
          </div>
        </div>
      </div>

      <!-- Image Étudiante -->
      <div class="w-full lg:w-2/5 flex justify-center">
        <img :src="IMGgirl" class="w-3/4 sm:w-2/3 lg:w-full" alt="Image Étudiante">
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
