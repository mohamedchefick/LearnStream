<script setup>
import categoryIcon from '../../assets/icons/category.png'

defineProps({
  category: {
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
  }
});
</script>

<template>
  <div 
  class="bg-white rounded-3xl shadow-lg"
  >
  <div class="h-48">
    <img :src="image" class="w-full h-full object-cover rounded-t-3xl" alt="">
  </div>
  <div class="py-4 flex justify-between bg-white rounded-b-3xl px-4">
    <div class="flex items-center gap-2">
        <img :src="categoryIcon" class="w-5 h-5" alt="">
        <span class="font-bold text-base">{{ category }}</span>
    </div>
      <div class="flex gap-2">
          <i v-for="i in rating" :key="i" class="fas fa-star text-yellow-400 text-lg"></i>
      </div>
  </div>
  <div class="px-4">
    <h1 class="py-4 text-xl text-start text-base font-semibold">{{ title }}</h1>
    <p class="text-sm text-start text-gray-500 pb-5">{{ shortdescription }}</p>
  </div>

  </div>
</template>