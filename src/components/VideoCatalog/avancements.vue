<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import { ref, onMounted } from 'vue';
import { apiRequest } from '../../utils/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const userCourses = ref([]);
const currentItem = ref(null);

const fetchUserCourses = async () => {
  try {
    const response = await apiRequest({ 
      method: "GET", 
      url: "/learning/user/courses/?page_size=3" 
    });
    userCourses.value = response.data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
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

onMounted(() => {
  fetchUserCourses();
});
</script>

<template>
    <div v-if="userCourses.length > 0" class="bg-[#EFE6D4] px-6 sm:px-12 lg:px-24 py-10">
        <!-- Title Section -->
        <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5">
            Mes progressions
            <div class="flex ms-20 mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
            </div>
        </div>

        <!-- Courses Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div 
                v-for="course in userCourses" 
                :key="course.id" 
                @click="handleContinueCourse(course.course.id)"
                class="bg-white p-4 rounded-3xl shadow-lg flex flex-col h-full cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
                <img :src="course.course.image" class="rounded-3xl w-full h-48 object-cover" alt="">
                <div class="flex flex-col flex-grow p-3">
                    <div class="flex gap-3 items-center font-medium">
                        <span :style="{ color: course.course.category.color }">{{ course.course.category.name }}</span>
                    </div>  
                    <div class="text-[#252641] text-xl font-semibold">{{ course.course.title }}</div>

                    <div class="flex flex-row justify-between items-center gap-2 pt-3 mt-auto">
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-[#0056D2] h-2.5 rounded-full" :style="{ width: course.progress + '%' }"></div>
                        </div>
                        <div class="text-end text-[#00000080] text-sm font-semibold">
                            {{ Math.round(course.progress) }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
