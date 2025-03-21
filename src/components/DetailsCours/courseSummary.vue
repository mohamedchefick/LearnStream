<script setup>
import { apiRequest } from '../../utils/api';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const course = ref(null);
const openChapters = ref({}); // Pour suivre l'état d'ouverture de chaque chapitre

const toggleChapter = (chapterId) => {
    openChapters.value[chapterId] = !openChapters.value[chapterId];
};

const fetchCourseDetails = async () => {
    try {
        const response = await apiRequest({ 
            method: 'GET', 
            url: `courses/course-summary/${route.params.id}/` 
        });
        course.value = response.data;
        loading.value = false;
        
        // Initialiser tous les chapitres comme fermés
        course.value.chapters.forEach(chapter => {
            openChapters.value[chapter.id] = false;
        });
    } catch (error) {
        console.error("Erreur lors du chargement du cours:", error);
        loading.value = false;
    }
};

const navigateToLesson = (lessonId) => {
    router.push(`/lesson/${lessonId}`);
};

const navigateToQuiz = (quizId) => {
    router.push(`/quiz/${quizId}`);
};

const userData = localStorage.getItem('userData');
const isUserDataAvailable = !!userData;

onMounted(() => {
    fetchCourseDetails();
});
</script>

<template>
    <div class="px-6 sm:px-12 lg:px-24 xl:px-28">
        <div v-if="loading" class="text-center py-8">
            <div class="animate-pulse">
                <div class="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div class="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div class="h-4 bg-gray-300 rounded w-full mb-4"></div>
            </div>
        </div>
        <div v-else-if="course" class="py-8">
            <h2 class="text-2xl font-bold mb-6">Plan du cours</h2>
            <p class="text-gray-700 mb-6">
                {{ course.short_description }}
            </p>
            <div class="space-y-4">
                <div v-for="(chapter, chapterIndex) in course.chapters" :key="chapter.id" 
                     class="bg-white rounded-lg border shadow-sm">
                    <div @click="toggleChapter(chapter.id)"
                         class="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                        <div class="flex items-center gap-4">
                            <i :class="[
                                'fas',
                                openChapters[chapter.id] ? 'fa-chevron-down' : 'fa-chevron-right',
                                'transition-transform duration-300'
                            ]"></i>
                            <h3 class="lg:text-lg font-semibold">Chapitre {{ chapterIndex + 1 }} : {{ chapter.title }}</h3>
                        </div>
                        <div v-if="chapter.progress?.completed" 
                             class="flex items-center text-green-500 gap-2">
                            <i class="fas fa-check-circle"></i>
                            <span class="text-sm">Complété</span>
                        </div>
                    </div>
                    
                    <div v-show="openChapters[chapter.id]" 
                         class="border-t p-6 space-y-3 transition-all duration-300">
                        <div v-for="(lesson, lessonIndex) in chapter.lessons" :key="lesson.id"
                             class="flex items-center gap-3 text-gray-700 pl-4"
                             @click="isUserDataAvailable ? navigateToLesson(lesson.id) : null">
                            <i class="fas fa-play-circle text-blue-500"></i>
                            <span class="text-sm md:text-base">Leçon {{ lessonIndex + 1 }} : {{ lesson.title }}</span>
                        </div>
                        
                        <div v-if="chapter.quiz" 
                             class="flex items-center gap-3 text-gray-700 pl-4 mt-2"
                             @click="isUserDataAvailable ? navigateToQuiz(chapter.quiz.id) : null">
                            <i class="fas fa-question-circle text-orange-400"></i>
                            <span class="text-sm md:text-base">Quiz : {{ chapter.quiz.title }}</span>
                            <span v-if="chapter.quiz.result" 
                                  class="text-sm text-green-500 ml-2">
                                ({{ chapter.quiz.result.percentage }}%)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center py-8 text-red-500">
            Impossible de charger le plan du cours
        </div>
    </div>
</template>
