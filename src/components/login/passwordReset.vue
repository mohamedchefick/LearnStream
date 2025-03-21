<script>
import { apiRequest } from '../../utils/api';
import { useToast } from 'vue-toast-notification';
import resetImage from '../../assets/images/reset-image.png';

export default {
    data() {
        return {
            email: '',
            code: ['', '', '', '', ''],
            new_password: '',
            loading: false,
            errors: {},
            resetImage,
            countdown: 30,
            canResend: false,
            timer: null
        };
    },

    created() {
        this.fetchEmail();
        this.startCountdown();
    },

    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },

    methods: {
        startCountdown() {
            this.countdown = 30;
            this.canResend = false;
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    this.canResend = true;
                    clearInterval(this.timer);
                }
            }, 1000);
        },

        fetchEmail() {
            this.email = localStorage.getItem('email') || '';
        },

        handleChange(text, index) {
            const newCode = [...this.code];
            newCode[index] = text;
            this.code = newCode;

            // Focus automatique sur l'input suivant
            if (text && index < this.code.length - 1) {
                this.$refs[`input-${index + 1}`][0].focus();
            }
        },

        handleKeyPress(index, event) {
            if (event.key === 'Backspace' && this.code[index] === '' && index > 0) {
                this.$refs[`input-${index - 1}`][0].focus();
            }
        },

        async handleSubmit() {
            const fullCode = this.code.join('');
            if (!fullCode || !this.new_password) {
                this.errors = { general: "Tous les champs sont obligatoires." };
                return;
            }

            this.loading = true;
            try {
                const response = await apiRequest({
                    method: 'POST',
                    url: 'users/password/reset/confirm/',
                    data: {
                        email: this.email,
                        otp_code: fullCode,
                        new_password: this.new_password
                    }
                });

                if (response.status === 200) {
                    const toast = useToast();
                    toast.success('Mot de passe réinitialisé avec succès. Connexion en cours...');

                    // Connexion automatique après réinitialisation
                    const loginResponse = await apiRequest({
                        method: 'POST',
                        url: 'users/login/',
                        data: {
                            email: this.email,
                            password: this.new_password,
                        },
                    });

                    if (loginResponse.status === 200) {
                        const data = loginResponse.data;
                        localStorage.setItem('refreshToken', data.refresh);
                        localStorage.setItem('accessToken', data.access);
                        localStorage.setItem('userData', JSON.stringify(data.user));
                        localStorage.setItem('password', this.new_password);
                        this.$router.push({ name: 'Home' });
                    } else {
                        const toast = useToast();
                        toast.error('Une erreur est survenue lors de la connexion.');
                    }
                }
            } catch (error) {
                const toast = useToast();
                toast.error(error.response?.data?.detail || "Une erreur est survenue lors de la réinitialisation du mot de passe");
                this.errors = { general: error.message };
            } finally {
                this.loading = false;
            }
        },

        async handleResendCode() {
            if (!this.canResend) return;
            
            if (!this.email) {
                this.errors = { general: "Email manquant" };
                return;
            }

            this.loading = true;
            try {
                const response = await apiRequest({
                    method: 'POST',
                    url: 'users/password/reset/request/',
                    data: {
                        email: this.email,
                    },
                });

                if (response.status === 200) {
                    const toast = useToast();
                    toast.success('Un nouveau code a été envoyé à votre email.');
                    this.startCountdown();
                }
            } catch (error) {
                this.errors = { general: error.message };
            } finally {
                this.loading = false;
            }
        }
    },

    computed: {
        isButtonDisabled() {
            return this.code.some(digit => digit === '') || !this.new_password || this.loading;
        }
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div class="w-full max-w-5xl flex flex-col lg:flex-row justify-center lg:space-x-10">
            <!-- Section image -->
            <div class="w-full lg:w-1/2 rounded-3xl hidden lg:block">
                <img 
                    :src="resetImage"
                    class="w-full h-full object-cover rounded-3xl"
                    alt="Image de réinitialisation"
                />
            </div>

            <!-- Section formulaire -->
            <div class="w-full lg:w-1/2 flex flex-col bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8">
                <h1 class="text-xl sm:text-2xl font-bold text-center mb-4">Réinitialisation du mot de passe</h1>
                <p class="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8">
                    Un code a été envoyé à <span class="font-semibold">{{ email }}</span>.<br>
                    Veuillez entrer le code et votre nouveau mot de passe.
                </p>

                <!-- Message d'erreur -->
                <div v-if="errors.general" class="text-red-500 text-sm text-center mb-4">
                    {{ errors.general }}
                </div>

                <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
                    <!-- Champs de saisie OTP -->
                    <div class="flex justify-between gap-2 sm:gap-3 mb-6 sm:mb-8">
                        <input
                            v-for="(digit, index) in code"
                            :key="index"
                            :ref="`input-${index}`"
                            v-model="code[index]"
                            type="text"
                            maxlength="1"
                            class="w-10 h-10 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl border-2 border-gray-300 rounded-lg focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2] outline-none"
                            @input="handleChange($event.target.value, index)"
                            @keyup="handleKeyPress(index, $event)"
                        />
                    </div>

                    <div class="form-control">
                        <input 
                            type="password"
                            v-model="new_password"
                            placeholder="Nouveau mot de passe"
                            class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none w-full text-sm sm:text-base p-2 sm:p-3"
                            required
                        />
                    </div>

                    <div class="space-y-4">
                        <button 
                            type="submit"
                            :disabled="isButtonDisabled"
                            class="w-full bg-[#0056D2] text-white py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:bg-[#0056D2]/50 disabled:text-white disabled:cursor-not-allowed btn btn-primary"
                            :class="{ 'loading': loading }"
                        >
                            <i class="fa-solid fa-key"></i>
                            {{ loading ? 'Chargement...' : 'Réinitialiser le mot de passe' }}
                        </button>

                        <div class="text-center">
                            <p class="text-gray-600 text-sm sm:text-base mb-2">Vous n'avez pas reçu de code ?</p>
                            <button 
                                @click="handleResendCode"
                                :disabled="!canResend || loading"
                                class="text-[#0056D2] font-semibold text-sm sm:text-base hover:text-blue-700 btn btn-link"
                                :class="{ 'loading': loading }"
                            >
                                {{ canResend ? 'Renvoyer le code' : `Renvoyer le code dans ${countdown} secondes` }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>