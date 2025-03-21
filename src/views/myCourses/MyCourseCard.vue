<script setup>
import { RouterLink } from 'vue-router';
import { API_URL } from '../../../env';
import illustrationGraduation from '../../assets/images/usely/illustration-graduation-hat_53876-5920.avif';

defineProps({
  course: {
    type: Object,
    required: true
  },
  onClick: {
    type: Function,
    default: () => {}
  }
});
</script>

<template>
  <div 
    class="w-full p-3 sm:p-5 rounded-2xl border border-2 border-blue-500 bg-blue-500/10 cursor-pointer"
    @click="onClick(course.course.id)"
  >
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div class="flex-shrink-0 w-full sm:w-auto">
          <img 
            :src="course.course.image ? (course.course.image.startsWith('http') ? course.course.image : API_URL + course.course.image) : illustrationGraduation"
            :alt="course.course.title"
            class="w-full sm:w-32 h-48 sm:h-32 rounded-xl object-cover"
          />
        </div>
        <div class="space-y-2 sm:space-y-3 w-full sm:w-auto">
          <p class="uppercase mb-1 text-sm sm:text-base" :style="{ color: course.course.category.color }">
            {{ course.course.category.name }}
          </p>
          <h3 class="font-bold text-gray-800 text-lg sm:text-xl">
            {{ course.course.title }}
          </h3>
          <div class="flex items-center gap-2">
            <div class="relative w-6 h-6">
              <div class="radial-progress text-gray-300 absolute inset-0" :style="{'--value': 100, '--size': '1.5rem', '--thickness': '2.5px'}">
              </div>
              <div class="radial-progress text-blue-500 absolute inset-0" :style="{'--value': Math.round(course.progress), '--size': '1.5rem', '--thickness': '2.5px'}">
              </div>
            </div>
            <span class="ml-1">{{ Math.round(course.progress) }}%</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 text-xs sm:text-sm text-gray-600">
            <p>
              Début : <span class="font-medium">{{ new Date(course.started_at).toLocaleDateString('fr-FR') }}</span>
            </p>
            <p class="hidden sm:block">|</p>
            <p v-if="course.completed_at">
              Fin : <span class="font-medium">{{ new Date(course.completed_at).toLocaleDateString('fr-FR') }}</span>
            </p>
            <p v-else-if="course.updated_at">
              Dernière activité : <span class="font-medium">{{ new Date(course.updated_at).toLocaleDateString('fr-FR') }}</span>
            </p>
          </div>
        </div>
      </div>
      <RouterLink 
        :to="`/certificat/${course.course.id}`"
        v-if="course.status === 'completed'" 
        class="btn btn-primary text-white font-semibold rounded-2xl w-full sm:w-auto mt-4 sm:mt-0"
        @click.stop
      >
        <i class="fas fa-certificate mr-1"></i>
        Voir mon certificat
      </RouterLink>
    </div>
  </div>
</template>