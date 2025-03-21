<script setup>
import Headers from '../../components/Helper/Header/index.vue';
import Aside from '../../components/lesson/aside.vue';
import { apiRequest } from '../../utils/api';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ScrollToTop from '../../components/Helper/scrollToTop.vue';  

const route = useRoute();
const router = useRouter();
const quizData = ref(null);
const loading = ref(true);
const submitting = ref(false);
const userAnswers = ref({});
const submitted = ref(false);
const score = ref(0);
const quizResponses = ref([]);
const quizGlobalStatus = ref(false);
const showModal = ref(false);
const remainingTime = ref(null);
const canRetake = ref(true);
const acceptSubmit = ref(false);
const isAuthorized = ref(true); // Add new state for authorization
const showAside = ref(false); // Add state for mobile aside visibility
const countdown = ref({
    hours: 0,
    minutes: 0,
    seconds: 0
});

const allQuestionsAnswered = computed(() => {
    if (!quizData.value) return false;
    
    return quizData.value.questions.every(question => {
        const answer = userAnswers.value[question.id];
        if (question.question_type === 'select') {
            return Array.isArray(answer) && answer.length > 0;
        }
        return answer !== null;
    });
});

const formatNumber = (number) => {
    return number.toString().padStart(2, '0');
};

const calculateRemainingTime = (completedAt) => {
    const completed = new Date(completedAt);
    const now = new Date();
    const timeElapsed = now - completed;
    const millisecondsLeft = (24 * 60 * 60 * 1000) - timeElapsed;
    
    if (millisecondsLeft > 0) {
        const hours = Math.floor(millisecondsLeft / (1000 * 60 * 60));
        const minutes = Math.floor((millisecondsLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((millisecondsLeft % (1000 * 60)) / 1000);
        
        countdown.value = {
            hours: formatNumber(hours),
            minutes: formatNumber(minutes),
            seconds: formatNumber(seconds)
        };
        
        remainingTime.value = `${countdown.value.hours}:${countdown.value.minutes}:${countdown.value.seconds}`;
        canRetake.value = false;
        
        setTimeout(() => {
            calculateRemainingTime(completedAt);
        }, 1000);
    } else {
        remainingTime.value = null;
        canRetake.value = true;
    }
};

const fetchQuiz = async () => {
    loading.value = true;
    try {
        try {
            const checkResponse = await apiRequest({
                method: 'GET',
                url: `quiz/check/${route.params.id}/`
            });

            if (checkResponse.data) {
                quizResponses.value = checkResponse.data.quiz_responses.map((response) => ({
                    ...response,
                    status: response.is_correct ? "success" : "failure",
                }));
                submitted.value = true;
                quizGlobalStatus.value = true;
                score.value = checkResponse.data.result.percentage;
                
                calculateRemainingTime(checkResponse.data.result.completed_at);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                isAuthorized.value = false;
            } else if (error.response?.status !== 404) {
                throw error;
            }
        }

        // Continue fetching quiz data even if unauthorized
        const response = await apiRequest({ 
            method: 'GET', 
            url: `quiz/get/${route.params.id}/` 
        });
        quizData.value = response.data;

        // Only set up answers if the user is authorized
        if (isAuthorized.value) {
            const savedAnswers = localStorage.getItem(`quiz_${route.params.id}_answers`);
            if (savedAnswers && !submitted.value) {
                userAnswers.value = JSON.parse(savedAnswers);
            } else {
                quizData.value.questions.forEach(question => {
                    if (question.question_type === 'select') {
                        userAnswers.value[question.id] = [];
                    } else {
                        userAnswers.value[question.id] = null;
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erreur lors du chargement du quiz:", error);
    } finally {
        loading.value = false;
    }
};

watch(userAnswers, (newAnswers) => {
    if (!submitted.value && isAuthorized.value) {
        localStorage.setItem(`quiz_${route.params.id}_answers`, JSON.stringify(newAnswers));
    }
}, { deep: true });

const submitQuiz = async () => {
    if (!allQuestionsAnswered.value) {
        alert("Veuillez répondre à toutes les questions avant de soumettre le quiz.");
        return;
    }

    submitting.value = true;

    const formattedResponses = Object.entries(userAnswers.value).map(([questionId, value]) => {
        const isArray = Array.isArray(value);
        return {
            question: parseInt(questionId),
            selected_options: isArray ? value : value !== null ? [value] : [],
        };
    });

    try {
        const response = await apiRequest({
            url: `quiz/submit/${route.params.id}/`,
            method: "POST",
            data: { responses: formattedResponses },
        });

        quizResponses.value = response.data.quiz_responses.map((response) => ({
            ...response,
            status: response.is_correct ? "success" : "failure",
        }));

        submitted.value = true;
        showModal.value = true;
        score.value = response.data.result.percentage;
        calculateRemainingTime(response.data.result.completed_at);
        
        localStorage.removeItem(`quiz_${route.params.id}_answers`);
    } catch (err) {
        alert("Erreur lors de la soumission.");
        console.error("Erreur lors de la soumission:", err);
    } finally {
        submitting.value = false;
    }
};

const getQuestionStatus = (questionId) => {
    const response = quizResponses.value.find(r => r.question === questionId);
    return response ? response.status : null;
};

const resetQuiz = () => {
    submitted.value = false;
    showModal.value = false;
    quizGlobalStatus.value = false;
    acceptSubmit.value = false;
    quizData.value.questions.forEach(question => {
        if (question.question_type === 'select') {
            userAnswers.value[question.id] = [];
        } else {
            userAnswers.value[question.id] = null;
        }
    });
    localStorage.removeItem(`quiz_${route.params.id}_answers`);
};

const toggleAside = () => {
    showAside.value = !showAside.value;
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchQuiz();
    }
  },
  { immediate: true }
);

onMounted(() => {
    if (route.params.id) {
        fetchQuiz();
    }
});
</script>

<template>
    <ScrollToTop />
    <div class="min-h-screen flex flex-col">
        <Headers />
        <div class="flex mt-28 px-4 md:px-8 lg:px-16 gap-20 relative">
            <!-- Mobile Aside Toggle Button -->
            <button 
                v-if="isAuthorized && quizData?.course_id" 
                @click="toggleAside"
                class="fixed bottom-4 right-4 z-50 lg:hidden h-10 w-10 rounded-full shadow-xl bg-[#FFF]/50">
                <i :class="showAside ? 'fa-times' : 'fa-bars'" class="fas"></i>
            </button>

            <!-- Mobile Aside -->
            <div v-if="isAuthorized && quizData?.course_id" 
                 :class="{'translate-x-0': showAside, '-translate-x-full': !showAside}"
                 class="fixed inset-0 z-40 lg:hidden bg-white transition-transform duration-300 ease-in-out">
                <div class="h-full overflow-y-auto pt-20">
                <Aside :courseId="quizData.course_id" />
                </div>
            </div>

            <!-- Desktop Aside -->
            <div v-if="isAuthorized && quizData?.course_id" class="hidden lg:block flex-1">
                <Aside :courseId="quizData.course_id" />
            </div>
            
            <main v-if="!loading" class="flex-[2] max-w-7xl mx-auto w-full">
                <div v-if="isAuthorized && quizData?.is_enrolled" class="bg-white">
                    <h1 class="text-2xl font-bold mb-4">{{ quizData.chapter_title }}</h1>
                    <div class="flex items-center justify-between mb-4">
                        <h1 class="text-xl text-[#0056D2] font-bold">{{ quizData.title }}</h1>
                        <div v-if="submitted" class="flex items-center gap-2">
                            <span class="text-lg font-semibold" :class="score >= 50 ? 'text-green-600' : 'text-red-600'">
                                Score: {{ Math.round(score) }}%
                            </span>
                            <span v-if="score >= 50" class="text-green-600">(Réussi ✓)</span>
                            <span v-else class="text-red-600">(Échoué ✗)</span>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg text-[#0056D2] mb-0">Compétences à évaluer</h3>
                        <hr class="border-gray-300 mb-4">
                        <div class="text-gray-600 mb-8 space-y-2">
                            <p v-for="skill in quizData?.skills?.split('\n') || []" :key="skill" class="flex items-center gap-1">
                                <span class="bg-[#FFA600] text-white h-6 w-6 rounded-full flex items-center justify-center">
                                    <i class="fa-solid fa-star"></i>
                                </span>
                                
                                {{ skill }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg text-[#0056D2] mb-0">Description</h3>
                        <hr class="border-gray-300 mb-4">
                        <div class="text-gray-600 mb-8 space-y-2">
                            <p class="text-gray-600 mb-8">{{ quizData.description }}</p>
                        </div>
                    </div>

                    <div v-if="!submitted" class="space-y-8">
                        <div v-for="(question, index) in quizData.questions" :key="question.id">
                            <h3 class="font-semibold text-[#0056D2] mb-0">Question {{ index + 1 }}</h3>
                            <hr class="border-gray-300 mb-4">
                            <p class="font-semibold mb-4">{{ question.text }}</p>
                            
                            <div v-if="question.question_type === 'radio'" class="space-y-3">
                                <label v-for="option in question.options" :key="option.id" class="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" :name="'question-'+question.id" :value="option.id" v-model="userAnswers[question.id]" class="form-radio">
                                    <span>{{ option.text }}</span>
                                </label>
                            </div>
                            
                            <div v-else class="space-y-3">
                                <label v-for="option in question.options" :key="option.id" class="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" :value="option.id" v-model="userAnswers[question.id]" class="form-checkbox">
                                    <span>{{ option.text }}</span>
                                </label>
                            </div>

                            <div v-if="submitted">
                                <p v-if="getQuestionStatus(question.id) === 'success'" class="text-green-600 mt-2">
                                    Réussi ! ✓
                                </p>
                                <p v-else-if="getQuestionStatus(question.id) === 'failure'" class="text-red-600 mt-2">
                                    Raté ! ✗
                                </p>
                            </div>
                        </div>
                        <p v-if="!allQuestionsAnswered" class="bg-blue-50 text-blue-600 text-sm mt-4 p-3 rounded-lg border border-blue-200 flex items-center gap-2">
                            <i class="fas fa-info-circle text-lg"></i>
                            Veuillez répondre à toutes les questions avant de soumettre.
                        </p>
                        <div class="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
                            <label class="flex items-center gap-2 text-gray-700">
                                <input type="checkbox" v-model="acceptSubmit" class="checkbox checkbox-primary">
                                <span>Je comprends qu'en cas d'échec, je devrai attendre 24h avant de pouvoir retenter le quiz</span>
                            </label>
                            <button @click="submitQuiz" 
                                    :disabled="!acceptSubmit || !allQuestionsAnswered || submitting"
                                    :class="{'opacity-50 cursor-not-allowed': !acceptSubmit || !allQuestionsAnswered || submitting}"
                                    class="bg-[#0056D2] text-white px-6 py-3 rounded-xl hover:bg-[#0056D2]/90 transition-colors flex items-center gap-2">
                                <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
                                <span>{{ submitting ? 'Soumission en cours...' : 'Soumettre le quiz' }}</span>
                            </button>
                        </div>
                    </div>

                    <div v-else class="space-y-8">
                        <div v-for="(question, index) in quizData.questions" :key="question.id">
                            <div class="flex items-center gap-2">
                                <h3 class="font-semibold text-[#0056D2] mb-0">Question {{ index + 1 }}</h3>
                                <span v-if="getQuestionStatus(question.id) === 'success'" class="text-green-600">
                                    (Réussi ✓)
                                </span>
                                <span v-else-if="getQuestionStatus(question.id) === 'failure'" class="text-red-600">
                                    (Raté ✗)
                                </span>
                            </div>
                            <hr class="border-gray-300 mb-4">
                            <p class="font-semibold">{{ question.text }}</p>
                            <p v-if="question.question_type !== 'radio'" class="text-sm text-gray-500">
                                <i class="fas fa-info-circle"></i>
                                Plusieurs réponses peuvent être valables
                            </p>
                            
                            <div v-if="question.question_type === 'radio'" class="space-y-3 mt-4">
                                <div v-for="option in question.options" :key="option.id" class="flex items-center space-x-3">
                                    <input type="radio" disabled :checked="userAnswers[question.id] === option.id" class="form-radio opacity-50">
                                    <span class="text-gray-500">{{ option.text }}</span>
                                </div>
                            </div>
                            
                            <div v-else class="space-y-3">
                                <div v-for="option in question.options" :key="option.id" class="flex items-center space-x-3">
                                    <input type="checkbox" disabled :checked="userAnswers[question.id].includes(option.id)" class="form-checkbox opacity-50">
                                    <span class="text-gray-500">{{ option.text }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col md:flex-row justify-end gap-4 py-4">
                            <div v-if="!canRetake" class="bg-gray-100 rounded-lg px-4 py-2 flex items-center mr-4">
                                <div class="text-gray-700">
                                    <i class="fas fa-clock mr-2"></i>
                                    Vous pourrez retenter dans :
                                </div>
                                <div class="ml-2 font-mono font-bold">
                                    <span class="countdown-block">{{ countdown.hours }}</span>
                                    <span class="countdown-separator">:</span>
                                    <span class="countdown-block">{{ countdown.minutes }}</span>
                                    <span class="countdown-separator">:</span>
                                    <span class="countdown-block">{{ countdown.seconds }}</span>
                                </div>
                            </div>
                            
                            <button v-if="canRetake" 
                                    @click="resetQuiz()" 
                                    class="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0056D2]/90 transition-colors flex items-center gap-2">
                                <i class="fas fa-redo"></i>
                                {{ score >= 50 ? 'Refaire' : 'Réessayer' }}
                            </button>
                            
                            <button v-if="score >= 50" 
                                @click="router.push(`/lesson/${quizData.next_item.id}`)"
                                    class="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0056D2]/90 transition-colors flex items-center gap-2">
                                Suivant
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-25 z-[1] flex items-center justify-center">
                        <div class="bg-white p-8 rounded-lg max-w-md w-full relative">
                            <button @click="showModal = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                            
                            <h2 class="text-2xl font-bold mb-4 text-center">
                                {{ score >= 50 ? 'Quiz réussi ! 🎉' : 'Quiz échoué ! ❌' }}
                            </h2>
                            <p class="text-xl mb-2 text-center">Score: {{ Math.round(score) }}%</p>
                            
                            <div class="flex justify-center gap-4 mt-6">
                                <button v-if="canRetake" 
                                        @click="resetQuiz()" 
                                        class="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0056D2]/90 transition-colors flex items-center gap-2">
                                    <i class="fas fa-redo"></i>
                                    {{ score >= 50 ? 'Refaire' : 'Réessayer' }}
                                </button>
                                
                                <button v-if="score >= 50" 
                                    @click="router.push(`/lesson/${quizData.next_item.id}`)"
                                        class="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0056D2]/90 transition-colors flex items-center gap-2">
                                    Suivant
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                            
                            <div v-if="!canRetake" class="bg-gray-100 rounded-lg p-4 mt-4">
                                <div class="text-center text-gray-700 mb-2">
                                    <i class="fas fa-clock mr-2"></i>
                                    Vous pourrez retenter dans :
                                </div>
                                <div class="flex justify-center items-center gap-1 font-mono font-bold">
                                    <span class="countdown-block">{{ countdown.hours }}</span>
                                    <span class="countdown-separator">:</span>
                                    <span class="countdown-block">{{ countdown.minutes }}</span>
                                    <span class="countdown-separator">:</span>
                                    <span class="countdown-block">{{ countdown.seconds }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Update condition to show unauthorized message -->
                <div v-else class="bg-white p-8 rounded-lg text-center">
                    <i class="fas fa-lock text-6xl text-gray-300 mb-6"></i>
                    <h2 class="text-2xl font-bold mb-4">Accès restreint</h2>
                    <p class="text-gray-600 mb-6">Vous devez être inscrit au cours pour accéder à ce quiz.</p>
                    <button 
                        v-if="isAuthorized"
                        @click="router.push(`/courseDetail/${quizData.course_id}`)"
                        class="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0056D2]/90 transition-colors">
                        S'inscrire au cours
                    </button>
                </div>
            </main>
            
            <div v-else class="flex-[2] flex items-center justify-center min-h-[500px]">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#0056D2]"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-radio {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #FFA600;
    border-radius: 50%;
    margin-right: 0.5rem;
    position: relative;
}

.form-radio:checked {
    background-color: #FFA600;
    border-color: #FFA600;
}

.form-radio:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: white;
}

.form-radio:focus {
    outline: 2px solid #FFA600;
    outline-offset: 2px;
}

.form-checkbox {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #FFA600;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
    position: relative;
}

.form-checkbox:checked {
    background-color: #FFA600;
    border-color: #FFA600;
}

.form-checkbox:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 0.3rem;
    height: 0.6rem;
    border: solid white;
    border-width: 0 2px 2px 0;
}

.form-checkbox:focus {
    outline: 2px solid #FFA600;
    outline-offset: 2px;
}

.countdown-block {
    background-color: #0056D2;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    min-width: 2.5em;
    display: inline-block;
    text-align: center;
}

.countdown-separator {
    color: #0056D2;
    font-weight: bold;
    padding: 0 2px;
}
</style>