<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<template>
  <!-- Composant invisible qui gère uniquement le scroll -->
</template>
