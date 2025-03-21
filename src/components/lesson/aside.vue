<script setup>
import { ref, onMounted, watch } from 'vue';
import { apiRequest } from '../../utils/api';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  courseId: {
    type: String,
    required: true
  }
});

const loading = ref(true);
const course = ref(null);

// Vérifier si l'utilisateur est connecté
const checkUserConnection = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    router.push(`/courseDetail/${props.courseId}`);
  }
};

const fetchCourseDetails = async () => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: `courses/course-summary/${props.courseId}/`
    });
    course.value = response.data;
    console.log("course-summary", course.value)
    loading.value = false;
  } catch (error) {
    console.error("Erreur lors du chargement du cours:", error);
    loading.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navigateToLesson = (lessonId) => {
  scrollToTop();
  router.push(`/lesson/${lessonId}`);
};

const navigateToQuiz = (quizId) => {
  router.push(`/quiz/${quizId}`);
};

const isActive = (type, id) => {
  if (type === 'lesson') {
    return route.path === `/lesson/${id}`;
  } else if (type === 'quiz') {
    return route.path === `/quiz/${id}`;
  }
  return false;
};

onMounted(() => {
  checkUserConnection(); // Vérifier la connexion de l'utilisateur lors du montage
  fetchCourseDetails();
});
</script>

<template>
  <div>
    <div class="fixed w-full lg:w-1/4 pe-4 bg-white z-[1] h-[calc(100vh-120px)] flex flex-col lg:mt-0 mt-5 lg:ms-0 ms-1">
          <div v-if="loading" class="fixed w-full lg:w-1/4 pe-4 bg-white z-[1] h-[calc(100vh-120px)] flex flex-col">
            <div class="animate-pulse space-y-4">
              <!-- Titre du cours -->
              <div class="h-8 bg-gray-200 rounded-full w-3/4 mb-6"></div>

              <!-- Répéter pour 3 chapitres (exemple) -->
              <div v-for="index in 3" :key="index" class="rounded-lg border">
                <!-- En-tête du chapitre -->
                <div class="p-3 space-y-2">
                  <div class="h-3 bg-gray-200 rounded-full w-1/4"></div>
                  <div class="h-5 bg-gray-200 rounded-full w-3/4"></div>
                </div>

                <div class="border-t p-3 space-y-4">
                  <!-- 2 leçons par chapitre -->
                  <div v-for="lessonIndex in 2" :key="lessonIndex" class="space-y-4">
                    <div class="flex items-center gap-2">
                      <!-- Image placeholder -->
                      <div class="w-20 h-16 bg-gray-200 rounded-lg"></div>
                      <div class="flex-1 space-y-2">
                        <div class="h-3 bg-gray-200 rounded-full w-1/4"></div>
                        <div class="h-4 bg-gray-200 rounded-full w-3/4"></div>
                      </div>
                      <!-- Icône check -->
                      <div class="w-5 h-5 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>

                  <!-- Quiz -->
                  <div class="flex items-center gap-2">
                    <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-3 bg-gray-200 rounded-full w-1/4"></div>
                      <div class="h-4 bg-gray-200 rounded-full w-1/2"></div>
                    </div>
                    <!-- Résultats quiz -->
                    <div class="space-y-1">
                      <div class="w-5 h-5 bg-gray-200 rounded-full ml-auto"></div>
                      <div class="h-3 bg-gray-200 rounded-full w-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div v-else-if="course" class="flex flex-col h-full">
          <router-link :to="`/courseDetail/${course.id}`" class="text-xl font-extrabold mb-4 text-[#0056D2] bg-white w-full">{{ course.title }}</router-link>
          <div class="space-y-4 flex-1 overflow-y-auto">
            <div v-for="(chapter, chapterIndex) in course.chapters" :key="chapter.id" 
                 class="rounded-lg border">
              <div class="p-3">
                <div class="flex items-center gap-2">
                  <div class="flex-1">
                    <span class="text-sm text-gray-400">Module {{ chapterIndex + 1 }}</span>
                    <h3 class="text-xl font-semibold">{{ chapter.title }}</h3>
                  </div>
                  <div v-if="chapter.progress?.completed" class="text-green-500">
                    <i class="fas fa-check-circle text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div class="border-t">
                <div v-for="(lesson, lessonIndex) in chapter.lessons" :key="lesson.id"
                     @click="navigateToLesson(lesson.id)"
                     :class="['block p-3 hover:bg-gray-100 cursor-pointer', 
                             {'bg-gray-100': isActive('lesson', lesson.id)}]">
                  <div class="flex items-center gap-2">
                    <img 
                      :src="`https://img.youtube.com/vi/${lesson.video_id}/mqdefault.jpg`"
                      :alt="lesson.title"
                      class="w-20 h-16 object-cover rounded-lg flex-shrink-0">
                    <div class="flex-1">
                      <span class="text-sm text-gray-400">Leçon {{ lessonIndex + 1 }}</span>
                      <p class="font-medium">{{ lesson.title }}</p>
                    </div>
                    <div v-if="lesson.progress?.completed" class="text-green-500">
                      <i class="fas fa-check-circle"></i>
                    </div>
                  </div>
                </div>
                <div v-if="chapter.quiz" 
                     @click="navigateToQuiz(chapter.quiz.id)"
                     :class="['block p-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer',
                             {'bg-gray-100': isActive('quiz', chapter.quiz.id)}]">
                  <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <i class="fas fa-question text-xl"></i>
                  </div>
                  <div class="flex-1">
                    <span class="text-sm text-gray-400">Quiz</span>
                    <p class="font-medium">{{ chapter.quiz.title }}</p>
                  </div>
                  <div v-if="chapter.quiz?.result" class="text-right">
                    <div v-if="chapter.quiz?.result?.success" class="text-green-500">
                      <i class="fas fa-check-circle"></i>
                    </div>
                    <div v-else class="text-red-500">
                      <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ chapter.quiz.result.percentage }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4 text-red-500">
          Impossible de charger le plan du cours
        </div>
    </div>
  </div>
</template>
