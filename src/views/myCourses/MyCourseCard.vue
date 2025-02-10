<script setup>
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
    class="w-full p-5 rounded-2xl border border-2 border-blue-500 bg-blue-500/10 cursor-pointer"
    @click="onClick(course.course.id)"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <div class="flex-shrink-0">
          <img 
            :src="course.course.image" 
            :alt="course.course.title"
            class="w-32 h-32 rounded-xl object-cover"
          />
        </div>
        <div class="space-y-3">
          <p class="uppercase mb-1" :style="{ color: course.course.category.color }">
            {{ course.course.category.name }}
          </p>
          <h3 class="font-bold text-gray-800">
            {{ course.course.title }}
          </h3>
          <div class="flex items-center gap-2 mt-2">
            <div class="relative w-6 h-6">
              <div class="radial-progress text-gray-300 absolute inset-0" :style="{'--value': 100, '--size': '1.5rem', '--thickness': '2.5px'}">
              </div>
              <div class="radial-progress text-blue-500 absolute inset-0" :style="{'--value': Math.round(course.progress), '--size': '1.5rem', '--thickness': '2.5px'}">
              </div>
            </div>
            <span class="ml-1">{{ Math.round(course.progress) }}%</span>
          </div>
          <div class="flex gap-2 mt-2 text-sm text-gray-600">
            <p>
              Début : <span class="font-medium">{{ new Date(course.started_at).toLocaleDateString('fr-FR') }}</span>
            </p>
            <p>|</p>
            <p v-if="course.completed_at">
              Fin : <span class="font-medium">{{ new Date(course.completed_at).toLocaleDateString('fr-FR') }}</span>
            </p>
            <p v-else-if="course.updated_at">
              Dernière activité : <span class="font-medium">{{ new Date(course.updated_at).toLocaleDateString('fr-FR') }}</span>
            </p>
          </div>
        </div>
      </div>
      <button v-if="course.status === 'completed'" type="button" class="btn btn-primary text-white font-semibold rounded-2xl">
        Voir mon certificat
      </button>
    </div>
  </div>
</template>