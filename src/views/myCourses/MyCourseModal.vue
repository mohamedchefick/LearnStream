<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  courses: {
    type: Array,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function,
    required: true
  },
  onScroll: {
    type: Function,
    required: true
  },
  onCourseClick: {
    type: Function,
    required: true
  }
});
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
    <div class="min-h-screen px-4 flex items-center justify-center">
      <div class="bg-white w-full max-w-6xl rounded-lg shadow-xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-[#0056D2]">{{ title }}</h2>
          <button @click="onClose" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="overflow-y-auto max-h-[70vh]" @scroll="onScroll">
          <div class="flex flex-col gap-8">
            <CourseCard
              v-for="course in courses"
              :key="course.id"
              :course="course"
              :onClick="onCourseClick"
            />
          </div>
          <div v-if="loading" class="text-center py-4">
            Chargement...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from './MyCourseCard.vue';
</script>