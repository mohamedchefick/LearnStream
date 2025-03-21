<script setup>
import Headers from '../../components/Helper/Header/index.vue';
import Footer from '../../components/Helper/Footer/index.vue';
import MostPopularCourses from '../../components/VideoCatalog/mostPopularCourses.vue';
import CourseCard from './MyCourseCard.vue';
import CourseModal from './MyCourseModal.vue';
import { ref, onMounted, computed } from 'vue';
import { apiRequest } from '../../utils/api';
import { useRouter } from 'vue-router';
import ScrollToTop from '../../components/Helper/scrollToTop.vue';

const router = useRouter();
const userCoursesInProgress = ref([]);
const userCoursesInProgressCount = ref(0);
const userCoursesCompleted = ref([]);
const userCoursesCompletedCount = ref(0);
const currentItem = ref(null);
const loading = ref(true);

// Modal states
const showInProgressModal = ref(false);
const showCompletedModal = ref(false);
const modalInProgressCourses = ref([]);
const modalCompletedCourses = ref([]);
const inProgressNextPage = ref(null);
const completedNextPage = ref(null);
const loadingMore = ref(false);

const emptyStateMessage = computed(() => {
  if (userCoursesInProgress.value.length === 0 && userCoursesCompleted.value.length === 0) {
    return {
      inProgress: {
        emoji: "📚",
        title: "Aucun cours en progression",
        message: "Vous n'avez pas encore commencé de cours.\nDécouvrez notre catalogue pour commencer votre apprentissage !"
      },
      completed: {
        emoji: "🎯",
        title: "Aucun cours terminé",
        message: "Commencez votre premier cours pour obtenir vos premiers certificats !"
      }
    };
  } else if (userCoursesInProgress.value.length === 0 && userCoursesCompleted.value.length > 0) {
    return {
      inProgress: {
        emoji: "🎉",
        title: "Félicitations !",
        message: "Vous avez terminé tous vos cours en cours.\nPrêt à relever de nouveaux défis ?"
      },
      completed: {
        emoji: "🏆",
        title: "Vos cours terminés",
        message: ""
      }
    };
  } else {
    return {
      inProgress: {
        emoji: "📚",
        title: "Aucun cours en progression",
        message: "Vous n'avez pas encore commencé de cours"
      },
      completed: {
        emoji: "🎯",
        title: "Aucun cours terminé",
        message: "Continuez vos cours en progression pour obtenir vos premiers certificats !"
      }
    };
  }
});

const fetchUserCourses = async () => {
  try {
    loading.value = true;
    const responseInProgress = await apiRequest({ 
      method: "GET", 
      url: "/learning/user/courses/?is_completed=false" 
    });
    userCoursesInProgress.value = responseInProgress.data.results;
    userCoursesInProgressCount.value = responseInProgress.data.count;

    const responseCompleted = await apiRequest({ 
      method: "GET", 
      url: "/learning/user/courses/?is_completed=true" 
    });
    userCoursesCompleted.value = responseCompleted.data.results;
    userCoursesCompletedCount.value = responseCompleted.data.count;
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
  } finally {
    loading.value = false;
  }
};

const handleContinueCourse = async (courseId) => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: `courses/courses/${courseId}/`
    });
    currentItem.value = response.data.current_item;
    
    if (currentItem.value && currentItem.value.type === "lesson") {
      router.push(`/lesson/${currentItem.value.id}`);
    } else if (currentItem.value && currentItem.value.type === "quiz") {
      router.push(`/quiz/${currentItem.value.id}`);
    } else {
      router.push(`/courseDetail/${courseId}`);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du cours:', error);
    router.push(`/courseDetail/${courseId}`);
  }
};

const openInProgressModal = async () => {
  showInProgressModal.value = true;
  try {
    const response = await apiRequest({
      method: 'GET',
      url: '/learning/user/courses/?is_completed=false&page=1'
    });
    modalInProgressCourses.value = response.data.results;
    inProgressNextPage.value = response.data.next;
  } catch (error) {
    console.error('Erreur lors du chargement des cours:', error);
  }
};

const openCompletedModal = async () => {
  showCompletedModal.value = true;
  try {
    const response = await apiRequest({
      method: 'GET', 
      url: '/learning/user/courses/?is_completed=true&page=1'
    });
    modalCompletedCourses.value = response.data.results;
    completedNextPage.value = response.data.next;
  } catch (error) {
    console.error('Erreur lors du chargement des cours:', error);
  }
};

const loadMoreCourses = async (isCompleted) => {
  if (loadingMore.value) return;
  
  const nextPage = isCompleted ? completedNextPage.value : inProgressNextPage.value;
  if (!nextPage) return;

  loadingMore.value = true;
  try {
    const response = await apiRequest({
      method: 'GET',
      url: nextPage
    });

    if (isCompleted) {
      modalCompletedCourses.value = [...modalCompletedCourses.value, ...response.data.results];
      completedNextPage.value = response.data.next;
    } else {
      modalInProgressCourses.value = [...modalInProgressCourses.value, ...response.data.results];
      inProgressNextPage.value = response.data.next;
    }
  } catch (error) {
    console.error('Erreur lors du chargement de plus de cours:', error);
  } finally {
    loadingMore.value = false;
  }
};

const handleScroll = async (event, isCompleted) => {
  const element = event.target;
  if (element.scrollHeight - element.scrollTop <= element.clientHeight + 100) {
    await loadMoreCourses(isCompleted);
  }
};

onMounted(() => {
  fetchUserCourses();
});
</script>

<template>
  <Headers />
  <ScrollToTop/>
  <div class="mt-40">
    <div class="container mx-auto px-4 mb-20">
      <h1 class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5 mb-8">Mes cours en progression</h1>
      
      <div class="flex flex-col gap-8">
        <template v-if="loading">
          <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div class="flex gap-4">
              <div class="w-48 h-32 bg-gray-200 rounded-lg"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="userCoursesInProgress.length === 0">
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="text-6xl mb-4">{{ emptyStateMessage.inProgress.emoji }}</div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-2">{{ emptyStateMessage.inProgress.title }}</h3>
            <p class="text-gray-600" v-html="emptyStateMessage.inProgress.message.replace('\n', '<br>')"></p>
          </div>
        </template>
        <template v-else>
          <CourseCard
            v-for="course in userCoursesInProgress"
            :key="course.id"
            :course="course"
            :onClick="handleContinueCourse"
          />
        </template>
      </div>
      <button 
        v-if="userCoursesInProgressCount > 10"
        @click="openInProgressModal" 
        class="text-blue-500 font-semibold rounded-2xl mt-2 float-end"
      >
        Voir tous ({{ userCoursesInProgressCount }})
      </button>
    </div>

    <MostPopularCourses />

    <div class="container mx-auto px-4 my-20">
      <h1 class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5 mb-8">Mes cours terminés</h1>
      
      <div class="flex flex-col gap-8">
        <template v-if="loading">
          <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div class="flex gap-4">
              <div class="w-48 h-32 bg-gray-200 rounded-lg"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="userCoursesCompleted.length === 0">
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="text-6xl mb-4">{{ emptyStateMessage.completed.emoji }}</div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-2">{{ emptyStateMessage.completed.title }}</h3>
            <p class="text-gray-600" v-if="emptyStateMessage.completed.message" v-html="emptyStateMessage.completed.message.replace('\n', '<br>')"></p>
          </div>
        </template>
        <template v-else>
          <CourseCard
            v-for="course in userCoursesCompleted"
            :key="course.id"
            :course="course"
            :onClick="handleContinueCourse"
          />
        </template>
      </div>
      <button 
        v-if="userCoursesCompletedCount > 10"
        @click="openCompletedModal" 
        class="text-blue-500 font-semibold rounded-2xl mt-2 float-end"
      >
        Voir tous ({{ userCoursesCompletedCount }})
      </button>
    </div>
  </div>
  <Footer />

  <CourseModal
    title="Mes cours en progression"
    :courses="modalInProgressCourses"
    :show="showInProgressModal"
    :loading="loadingMore"
    :onClose="() => showInProgressModal = false"
    :onScroll="(event) => handleScroll(event, false)"
    :onCourseClick="handleContinueCourse"
  />

  <CourseModal
    title="Mes cours terminés"
    :courses="modalCompletedCourses"
    :show="showCompletedModal"
    :loading="loadingMore"
    :onClose="() => showCompletedModal = false"
    :onScroll="(event) => handleScroll(event, true)"
    :onCourseClick="handleContinueCourse"
  />
</template>