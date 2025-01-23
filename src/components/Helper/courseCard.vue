<script setup>
import categoryIcon from '../../assets/icons/category.png'

defineProps({
  category: {
    type: String,
    required: true
  },
  categoryColor: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String, 
    required: true
  },
  shortdescription: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div 
  class="bg-white rounded-3xl bg-gray-100 shadow-lg flex flex-col h-full"
  >
    <div class="h-48">
      <img :src="image" class="w-full h-full object-cover rounded-t-3xl" alt="">
    </div>
    <div class="py-2 rounded-b-3xl flex flex-col flex-grow">
      <div class="px-4 mb-2 flex justify-between">
        <div class="flex items-center gap-2">
          <img :src="categoryIcon" class="w-5 h-5" alt="">
          <span class="font-bold text-base" :style="{ color: categoryColor }">{{ category }}</span>
        </div>
        <div class="flex gap-2">
          <i v-for="i in rating" :key="i" class="fas fa-star text-yellow-400 text-lg"></i>
        </div>
      </div>
      <div class="px-4 mb-2 flex-grow">
        <h1 class="text-xl text-start text-base font-semibold mb-1">{{ title }}</h1>
        <p class="text-sm text-start text-gray-500">{{ shortdescription }}</p>
      </div>
      <div class="px-4 flex justify-between mt-auto">
        <h1 class="text-sm text-start text-gray-500 font-semibold"> 
          <i class="fas fa-graduation-cap"></i>
          {{ level }}
        </h1>
        <h1 class="text-sm text-start text-gray-500 font-semibold">
          <i class="fas fa-clock"></i>
          {{ duration }} h
        </h1>
      </div>
    </div>
  </div>
</template>