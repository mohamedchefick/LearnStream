<script setup>
import Headers from '../../components/Helper/Header/index.vue';
import Aside from '../../components/lesson/aside.vue';
import { apiRequest } from '../../utils/api';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ScrollToTop from '../../components/Helper/scrollToTop.vue';  

const route = useRoute();
const router = useRouter();
const lessonData = ref(null);
const loading = ref(true);
const completedLesson = ref(false);
const lessonCompleted = ref(false);

const fetchLesson = async () => {
    try {
        const response = await apiRequest({ 
            method: 'GET', 
            url: `courses/lessons/${route.params.id}/` 
        });
        lessonData.value = response.data;
        loading.value = false;
    } catch (error) {
        console.error("Erreur lors du chargement du cours:", error);
        loading.value = false;
    }
};

const markAsCompleted = async (lessonId) => {
    try {
      await apiRequest({
        method: 'POST',
        url: '/learning/user/lesson/',
        data: { lesson_id: lessonId },
      });
      completedLesson.value = true;
    } catch (err) {
      alert('Échec du marquage de la leçon comme terminée');
    }
};

const handleNext = async (lessonId) => {
    try {
        await markAsCompleted(lessonId);
        
        if (lessonData.value?.next_item) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const { type, id } = lessonData.value.next_item;
            if (type === 'lesson') {
                router.push(`/lesson/${id}`);
            } else if (type === 'quiz') {
                router.push(`/quiz/${id}`);
            }
        } else {
            router.push(`/courseDetail/${lessonData.value.course_id}`);
        }
    } catch (error) {
        alert('Impossible de passer à la leçon suivante');
    }
};

const courseId = computed(() => lessonData.value?.course_id);

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchLesson();
      lessonCompleted.value = false;
    }
  }
);

onMounted(() => {
    fetchLesson();
});
</script>

<template>
    <ScrollToTop />
    <div class="min-h-screen flex flex-col">
        <Headers />
        <div class="flex mt-28 px-4 md:px-8 lg:px-16 gap-20">
            <div class="flex-1">
                <Aside v-if="courseId" :courseId="courseId" />
            </div>
            <main v-if="!loading" class="flex-[2] max-w-7xl mx-auto w-full">
                <div v-if="lessonData.video_id" class="video-container mb-8">
                    <iframe 
                        :src="`https://www.youtube.com/embed/${lessonData.video_id}`"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        class="w-full aspect-video max-h-[600px] rounded-lg shadow-lg"
                    ></iframe>
                </div>
                <h1 class="text-xl font-bold text-gray-900 mb-6">{{ lessonData.title }}</h1>
                <div v-html="lessonData.content" class="prose max-w-none"></div>
                
                <div class="mt-8 flex flex-row items-center justify-between h-[100px]">
                    <div class="flex items-center gap-2 mb-4">
                        <input 
                            type="checkbox" 
                            v-model="lessonCompleted"
                            id="lessonCompleted"
                            class="checkbox checkbox-primary"
                        >
                        <label for="lessonCompleted" class="text-gray-700">J'ai terminé la leçon</label>
                    </div>
                    <button 
                        v-if="lessonData.next_item"
                        @click="handleNext(lessonData.id)"
                        :disabled="!lessonCompleted"
                        :class="[
                            'px-6 py-2 rounded-lg transition-colors',
                            lessonCompleted ? 'bg-[#0056D2] text-white hover:bg-[#0056D2] cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        ]"
                    >
                        Suivant <i class="fa-solid fa-arrow-right"></i>
                    </button>
                    <button 
                        v-else
                        @click="handleNext(lessonData.id)"
                        :disabled="!lessonCompleted"
                        :class="[
                            'px-6 py-2 rounded-lg transition-colors',
                            lessonCompleted ? 'bg-[#0056D2] text-white hover:bg-[#0056D2] cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        ]"
                    >
                        Terminé <i class="fa-solid fa-check"></i>
                    </button>

                </div>
            </main>
            <div v-else class="flex-grow flex items-center justify-center">
                <div class="text-xl text-gray-600">Chargement...</div>
            </div>
        </div>
    </div>
</template>

<style>
/* Bloc de style CSS pour personnaliser les blocs de code */
pre {
  background-color: #3c4148ee; /* Gris foncé pour le fond */
  color: #f1f5f9; /* Texte clair */
  padding: 1rem; /* Espacement intérieur */
  border-radius: 0.5rem; /* Bords arrondis */
  font-size: 0.875rem; /* Taille de police réduite */
  overflow-x: auto; /* Activation du défilement horizontal */
  line-height: 1.5;
  display: inline-block; /* Pour que le bloc s'adapte à son contenu */
  min-width: min-content; /* Largeur minimum basée sur le contenu */
  max-width: 100%; /* Largeur maximum */
  margin: 10px;
}

code {
  font-family: 'Fira Code', monospace; /* Police monospace pour le code */
  color: #d63384; /* Couleur principale pour les mots-clés */
}

pre code {
  display: block;
  white-space: pre-wrap; /* Texte qui s'enroule automatiquement */
}
</style>
