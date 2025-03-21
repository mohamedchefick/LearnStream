<script setup>
import Headers from '../Helper/Header/index.vue'
import footers from '../Helper/Footer/index.vue'
import detailsCours from '../../assets/images/usely/illustration-graduation-hat_53876-5920.avif';
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import imgCour from '../../assets/images/imgCour.png'
import ImgCertif from '../../assets/images/imgCertif.png'
import link from '../../assets/icons/linke.svg'
import evaluation from '../../assets/icons/evaluation.svg'
import enseignefr from '../../assets/icons/enseignefr.svg'
import { apiRequest } from '../../utils/api';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import courseSummary from './courseSummary.vue';

const route = useRoute();
const router = useRouter();
const courseData = ref(null);
const loading = ref(true);
const status = ref('');
const showModal = ref(false);

const userData = JSON.parse(localStorage.getItem('userData'));
const userId = userData ? userData.id : null;
const currentItem = ref(null);

const fetchCourseDetails = async () => {
    loading.value = true;
    try {
        const response = await apiRequest({ 
            method: 'GET', 
            url: `courses/courses/${route.params.id}/` 
        });
        courseData.value = response.data;
        currentItem.value = response.data.current_item;

        // Vérifier le statut de l'utilisateur
        if (userId) {
            const enrolledUser = response.data.enrolled_users.find(user => user.user_id === userId);
            if (enrolledUser) {
                status.value = enrolledUser.status === "completed" ? 'completed' : 'enrolled';
            }
        }

    } catch (error) {
        console.error("Erreur lors du chargement du cours:", error);
    } finally {
        loading.value = false;
    }
};

const handleStartCourse = async () => {
    if (!userData) {
        router.push('/auth');
        return;
    }

    try {
        const response = await apiRequest({ 
            method: 'POST', 
            url: `learning/subscribe/course/`, 
            data: { course_id: route.params.id } 
        });
        if (response.status.toString().startsWith('2')) {
            showModal.value = true;
            status.value = 'enrolled';
        }
    } catch (error) {
        if (error.response?.data?.already_subscribed) {
            alert('Vous êtes déjà inscrit à ce cours');
            if (currentItem.value.type==="lesson"){
                router.push(`/lesson/${currentItem.value.id}`);
            }else{
                router.push(`/quiz/${currentItem.value.id}`);
            }
        }
    }
};

const startLearning = () => {
    showModal.value = false;
    if (currentItem.value.type==="lesson"){
        router.push(`/lesson/${currentItem.value.id}`);
    }else{
        router.push(`/quiz/${currentItem.value.id}`);
    }
}
 
const handleContinueCourse = () => {
    if (currentItem.value.type==="lesson"){
        router.push(`/lesson/${currentItem.value.id}`);
    }else{
        router.push(`/quiz/${currentItem.value.id}`);
    }
}

const viewCertificate = () => {
    router.push(`/certificat/${route.params.id}`);
}

const closeModal = () => {
    showModal.value = false;
}

onMounted(() => {
    fetchCourseDetails();
});

const getSkills = () => {
    return courseData.value?.skills;
};

</script>

<template>
    <div class="min-h-screen">
        <Headers />
        
        <!-- Modal d'inscription -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-xl max-w-md w-full mx-4">
                <h2 class="text-2xl font-bold text-[#0056D2] mb-4">Félicitations !</h2>
                <p class="text-gray-700 mb-6">
                    Vous êtes maintenant inscrit au cours "{{ courseData?.title }}". Vous pouvez commencer votre apprentissage dès maintenant !
                </p>
                <div class="flex flex-col gap-3">
                    <button 
                        @click="startLearning"
                        class="w-full bg-[#0056D2] hover:bg-[#0045a8] text-white font-bold py-3 px-6 rounded-xl transition duration-200"
                    >
                        <i class="fa-solid fa-graduation-cap mr-2"></i>
                        Commencer le cours
                    </button>
                    <button 
                        @click="closeModal"
                        class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition duration-200"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#0056D2]"></div>
        </div>

        <!-- Hero section -->
        <div class="relative w-full">
            <div
                class="h-[400px] sm:h-96 xl:h-[504px] w-full bg-cover bg-center relative"
                :style="loading ? {} : { backgroundImage: courseData?.image ? `url(${courseData.image})` : `url(${detailsCours})` }"
            >
                <div class="absolute inset-0 flex items-center" :class="loading ? 'bg-gray-200 animate-pulse' : 'bg-black bg-opacity-50'">
                    <div class="space-y-5 mx-4 sm:mx-6 md:mx-20 z-10 w-full">
                        <div v-if="loading" class="h-10 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        <h1 v-else class="text-white text-xl sm:text-2xl md:text-4xl mt-6 sm:mt-10 px-2 sm:px-4 font-extrabold w-full lg:w-1/2">
                            {{ courseData?.title }}
                        </h1>
                        
                        <div class="lg:hidden">
                            <div class="flex gap-4 mb-4">
                                <div v-if="loading" class="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                                <h1 v-else class="text-xs sm:text-sm font-semibold text-white">
                                    <i class="fa-regular fa-clock"></i> {{ courseData?.duration || '0' }} heures
                                </h1>
                                
                                <div v-if="loading" class="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                                <h1 v-else class="text-xs sm:text-sm font-semibold text-white">
                                    <i class="fa-solid fa-star"></i> {{ courseData?.level || 'Débutant' }}
                                </h1>
                                
                                <div v-if="loading" class="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                                <h1 v-else class="text-xs sm:text-sm font-semibold text-white">
                                    <i class="fa-solid fa-language"></i> {{ courseData?.language || 'Non spécifié' }}
                                </h1>
                            </div>
    
                            <div v-if="loading" class="h-12 bg-gray-300 rounded w-48 animate-pulse"></div>
                            <template v-else>
                                <button 
                                    v-if="status === 'completed'"
                                    @click="viewCertificate"
                                    class="bg-[#497FEE] hover:bg-[#3a6cd4] text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition duration-200"
                                >
                                    <i class="fa-solid fa-certificate mr-2"></i>
                                    Voir mon certificat
                                </button>
                                <button 
                                    @click="handleContinueCourse"
                                    v-else-if="status === 'enrolled'"
                                    class="bg-[#0056D2] hover:bg-[#0045a8] text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition duration-200"
                                >
                                    <i class="fa-solid fa-play mr-2"></i>
                                    Continuer les cours
                                </button>
                                <button 
                                    @click="handleStartCourse"
                                    v-else
                                    class="bg-[#0056D2] hover:bg-[#0045a8] text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition duration-200"
                                >
                                    <i class="fa-solid fa-graduation-cap mr-2"></i>
                                    S'inscrire au cours
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-4 sm:mx-6 md:mx-20 items-end flex flex-col lg:flex-row lg:justify-between items-center gap-2 -mt-40 hidden lg:flex">
                <div class="bg-[#497FEE] px-4 sm:px-8 md:px-20 py-6 sm:py-10 rounded-2xl flex flex-wrap lg:flex-nowrap items-start lg:items-center w-full lg:w-2/3 text-white z-10">
                    <div v-if="loading" class="w-full grid grid-cols-4 gap-4">
                        <div v-for="i in 4" :key="i" class="h-20 bg-blue-400 rounded animate-pulse"></div>
                    </div>
                    <template v-else>
                        <div class="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-6 lg:mb-0">
                            <h1 class="font-bold text-base sm:text-lg flex items-center gap-2">
                                <i class="fa-regular fa-clock"></i>
                                Durée du cours
                            </h1>
                            <h1 class="text-xs sm:text-sm">{{ courseData?.duration || '0' }} heures</h1>
                        </div>
                        <div class="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-6 lg:mb-0">
                            <h1 class="font-bold text-base sm:text-lg flex items-center gap-2">
                                <i class="fa-solid fa-star"></i>
                                Niveau
                            </h1>
                            <h1 class="text-xs sm:text-sm">{{ courseData?.level || 'Débutant' }}</h1>
                        </div>
                        <div class="w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-6 lg:mb-0">
                            <h1 class="font-bold text-base sm:text-lg flex items-center gap-2">
                                <i class="fa-solid fa-language"></i>
                                Langue
                            </h1>
                            <h1 class="text-xs sm:text-sm">{{ courseData?.language || 'Non spécifié' }}</h1>
                        </div>
                        <div class="w-full lg:w-1/4">
                            <h1 class="font-bold text-base sm:text-lg flex items-center gap-2">
                                <i class="fa-solid fa-calendar-days"></i>
                                Programme flexible
                            </h1>
                            <h1 class="text-xs sm:text-sm">Apprenez à votre rythme.</h1>
                        </div>
                    </template>
                </div>
                <div class="flex justify-center items-center lg:w-1/3 -mb-10 relative z-10">
                    <div class="w-full md:w-3/4 lg:w-auto h-auto rounded-2xl overflow-hidden bg-white shadow-lg p-4">
                        <div v-if="loading" class="space-y-4">
                            <div class="h-48 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-20 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-12 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <template v-else>
                            <img 
                                :src="courseData?.image ? courseData.image : detailsCours" 
                                class="w-full h-48 object-cover rounded-2xl" 
                                alt="Image du cours" 
                            />
                            <div>
                                <p class="text-gray-700 text-sm sm:text-base mb-4">
                                    {{ courseData?.short_description }}
                                </p>
                                <button 
                                    v-if="status === 'completed'"
                                    @click="viewCertificate"
                                    class="w-full bg-[#497FEE] hover:bg-[#3a6cd4] text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition duration-200"
                                >
                                    <i class="fa-solid fa-certificate mr-2"></i>
                                    Voir mon certificat
                                </button>
                                <button 
                                    @click="handleContinueCourse"
                                    v-else-if="status === 'enrolled'"
                                    class="w-full bg-[#0056D2] hover:bg-[#0045a8] text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition duration-200"
                                >
                                    <i class="fa-solid fa-play mr-2"></i>
                                    Continuer les cours
                                </button>
                                <button 
                                    @click="handleStartCourse"
                                    v-else
                                    class="w-full bg-[#0056D2] hover:bg-[#0045a8] text-white text-base sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition duration-200"
                                >
                                    <i class="fa-solid fa-graduation-cap mr-2"></i>
                                    S'inscrire au cours
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cours section -->
        <div class="mt-20 sm:mt-32 px-4 sm:px-6 lg:px-24 xl:px-28">
            <div>
                <div class="md:flex justify-between items-center">
                    <div class="text-[#0056D2] text-lg sm:text-xl md:text-3xl font-bold xl:w-2/5">
                        Ce que vous apprendrez dans ce cours
                        <div class="flex xl:justify-end lg:me-20 mt-4">
                            <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
                    <div class="text-[#6F6B6B] text-base sm:text-lg w-full md:w-2/3">
                        <div v-if="loading" class="space-y-4">
                            <div v-for="i in 3" :key="i" class="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div v-else-if="courseData" v-html="courseData.description"></div>
                    </div>    
                    <div class="w-full md:w-1/3">
                        <img :src="imgCour" alt="" class="w-full">
                    </div>
                </div>
                <div class="mt-10">
                    <div>
                        <div class="font-bold text-xl sm:text-2xl md:text-3xl">Détails à connaître</div>
                        <div class="flex flex-col sm:flex-row gap-6 sm:gap-10 my-6 items-start sm:items-center">
                            <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                                <div v-for="i in 3" :key="i" class="h-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <template v-else>
                                <div class="w-full sm:w-auto">
                                    <img :src="link" class="mb-2" alt="">
                                    <h1 class="font-semibold text-sm sm:text-base">Certificat partageable</h1>
                                    <h1 class="text-sm">Ajouter à votre profil Lkd</h1>
                                </div>
                                <div class="w-full sm:w-auto">
                                    <img :src="evaluation" class="mb-2" alt="">
                                    <h1 class="font-semibold text-sm sm:text-base">Plusieurs modules</h1>
                                    <h1 class="text-sm">Apprendre à votre rythme</h1>
                                </div>
                                <div class="w-full sm:w-auto">
                                    <img :src="enseignefr" class="mb-2" alt="">
                                    <h1 class="font-semibold text-sm sm:text-base">Langue</h1>
                                    <h1 class="text-sm"> {{ courseData?.language || 'Français' }}</h1>
                                </div>
                            </template>
                        </div>
                    </div>
                    <img :src="ImgCertif" alt="" class="w-full">
                </div>
                <div class="mt-10">
                    <div class="md:flex justify-between items-center">
                        <div class="text-[#0056D2] text-lg sm:text-xl md:text-3xl font-bold xl:w-1/2">
                            Les compétences que vous acquérrez
                            <div class="flex xl:justify-end lg:me-20 mt-4">
                                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
                            </div>
                            <div class="w-full mt-5 flex flex-wrap gap-3">
                                <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                                    <div v-for="i in 6" :key="i" class="h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                                <template v-else>
                                    <button 
                                        v-for="(skill, index) in getSkills()" 
                                        :key="index" 
                                        class="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-[#0056D2] text-sm sm:text-base font-bold shadow-sm hover:bg-[#0056D2] hover:text-white transition duration-300"
                                    >
                                        {{ skill }}
                                    </button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <courseSummary />

        <footers />
    </div>
</template>