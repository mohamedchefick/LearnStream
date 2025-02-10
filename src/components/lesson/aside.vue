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

watch(
  () => route.path,
  () => {
    fetchCourseDetails();
  }
);

onMounted(() => {
  fetchCourseDetails();
});
</script>

<template>
  <div>
    <div class="fixed w-1/4 pe-4 bg-white z-[1] h-[calc(100vh-120px)] flex flex-col">
        <div v-if="loading" class="text-center py-4">
          Chargement...
        </div>
        <div v-else-if="course" class="flex flex-col h-full">
          <h2 class="text-xl font-extrabold mb-4 text-[#0056D2] bg-white w-full">{{ course.title }}</h2>
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
