<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import IMGgirl from '../../assets/images/img-student.webp'
import instructeur from '../../assets/icons/instructeur.svg'
import etudiants from '../../assets/icons/etudiants.svg'
import videos from '../../assets/icons/videos.svg'
import utilisateurs from '../../assets/icons/utilisateurs.svg'
import { apiRequest } from '../../utils/api'
import { ref, onMounted } from 'vue'

const stats = ref({
  users: 0,
  courses: 0,
  lessons: 0,
  chapters: 0
})

const displayedStats = ref({
  users: 0,
  courses: 0,
  lessons: 0,
  chapters: 0
})

const hasAnimated = ref(false)

const animateValue = (start, end, duration, statKey) => {
  if (start >= end) return
  
  const range = end - start
  const steps = Math.ceil(duration / 16) // Nombre total d'étapes pour 1.5s (1500ms/16ms)
  const increment = range / steps // Incrément proportionnel à la valeur finale
  let current = start
  
  const timer = setInterval(() => {
    current = Math.min(current + increment, end)
    displayedStats.value[statKey] = Math.round(current)
    
    if (current >= end) {
      clearInterval(timer)
      displayedStats.value[statKey] = end
    }
  }, 16)
}

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

const startAnimation = () => {
  if (!hasAnimated.value && Object.values(stats.value).some(val => val > 0)) {
    Object.keys(stats.value).forEach(key => {
      animateValue(0, stats.value[key], 1500, key) // 1500ms = 1.5s
    })
    hasAnimated.value = true
  }
}

onMounted(async () => {
  await fetchStats()
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation()
      }
    })
  }, { threshold: 0.1 })

  const statsSection = document.querySelector('#stats-section')
  if (statsSection) {
    observer.observe(statsSection)
  }
})
</script>

<template>
  <div class="py-10 px-6 sm:px-12 lg:px-24">
    <!-- Section Titre -->
    <div class="text-[#0056D2] text-2xl sm:text-3xl font-bold text-center lg:text-left -mb-20">
      Nos réalisations
      <div class="flex ms-4 mt-4">
        <img :src="iconDecouvrir" class="w-48" alt="Icône Découvrir">
      </div>
    </div>

    <!-- Section Contenu -->
    <div class="flex flex-col-reverse lg:flex-row justify-between items-center mt-10 xl:mt-0 gap-10">
      <!-- Section Statistiques -->
      <div id="stats-section" class="grid sm:grid-cols-2 gap-8 lg:gap-12 w-full lg:w-3/5 px-4 lg:px-0">
        <!-- Instructeurs -->
        <div class="flex gap-4 items-center">
          <img :src="instructeur" class="w-24 sm:w-16 lg:w-20" alt="Icône Instructeurs">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold">{{ displayedStats.courses }}+</h1>
            <h1 class="text-xl text-[#6D737A]">Cours</h1>
          </div>
        </div>
        <!-- Vidéos -->
        <div class="flex gap-4 items-center">
          <img :src="videos" class="w-24 sm:w-16 lg:w-20" alt="Icône Vidéos">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold">{{ displayedStats.lessons }}+</h1>
            <h1 class="text-xl text-[#6D737A]">Leçons</h1>
          </div>
        </div>
        <!-- Utilisateurs -->
        <div class="flex gap-4 items-center">
          <img :src="utilisateurs" class="w-24 sm:w-16 lg:w-20" alt="Icône Utilisateurs">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold">{{ displayedStats.users }}+</h1>
            <h1 class="text-xl text-[#6D737A]">Utilisateurs</h1>
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
