<script setup>
import IMGjoin from '../../assets/images/img-join.webp'
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  const userData = localStorage.getItem('userData')
  if (userData) {
    isLoggedIn.value = true
  }
})
</script>

<template>
    <div class="bg-[#F6FAFF] h-auto py-10 px-6 sm:px-12 lg:px-24 mb-40">
        <!-- Container pour la flexibilité -->
        <div class="flex flex-col lg:flex-row items-center pb-10 gap-10">
            <!-- Image -->
            <img 
                :src="IMGjoin" 
                class="w-full lg:w-1/2" 
                alt="Rejoignez-nous"
            />
            <!-- Texte -->
            <div class="text-center lg:text-left text-3xl lg:text-5xl w-full lg:w-1/2 font-bold space-y-7">
                <template v-if="isLoggedIn">
                    <h1>
                        <span class="text-[#FFA600]">Commencer à apprendre !</span>
                    </h1>
                </template>
                <template v-else>
                    <h1>
                        <span class="text-[#FFA600]">Rejoignez-nous</span> dès aujourd'hui !
                    </h1>
                    <h1 class="text-base lg:text-xl font-normal">
                        {{ 'Commencez à apprendre en vous inscrivant' }}
                    </h1>
                </template>
                <button 
                    class="bg-[#0056D2] py-3 lg:py-4 px-6 rounded-xl text-sm lg:text-base text-white hover:bg-[#003F9A] hover:scale-105 transition-transform duration-300"
                >
                    {{ isLoggedIn ? 'Explorer les cours' : 'S\'inscrire gratuitement' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
