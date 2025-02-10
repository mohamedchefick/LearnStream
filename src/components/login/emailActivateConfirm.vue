<script>
import ScrollToTop from '../../components/Helper/scrollToTop.vue';
import { apiRequest } from '../../utils/api';
import otpImage from '../../assets/images/otp-image.png';

export default {
    components: {
        ScrollToTop
    },
    data() {
        return {
            code: ['', '', '', '', ''],
            email: '',
            loading: false,
            errors: {},
            otpImage
        };
    },

    created() {
        this.fetchEmail();
    },

    methods: {
        fetchEmail() {
            const storedEmail = localStorage.getItem('email');
            if (storedEmail) {
                this.email = storedEmail;
            }
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
            if (this.isButtonDisabled) return;
            
            const fullCode = this.code.join('');
            const password = localStorage.getItem('password');

            if (!this.email || !password) {
                this.errors = { general: "Informations de connexion manquantes" };
                return;
            }

            this.loading = true;
            try {
                const response = await apiRequest({
                    method: 'POST',
                    url: 'users/email/activate/confirm/',
                    data: {
                        otp_code: fullCode,
                        email: this.email,
                    },
                });

                if (response.status === 200) {
                    // Connexion automatique après activation
                    const loginResponse = await apiRequest({
                        method: 'POST',
                        url: 'users/login/',
                        data: {
                            email: this.email,
                            password: password,
                        },
                    });

                    if (loginResponse.status === 200) {
                        const data = loginResponse.data;
                        localStorage.setItem('refreshToken', data.refresh);
                        localStorage.setItem('accessToken', data.access);
                        localStorage.setItem('userData', JSON.stringify(data.user));

                        this.$router.push({ name: 'Home' });
                    }
                }
            } catch (error) {
                this.errors = { general: error.message };
            } finally {
                this.loading = false;
            }
        },

        async handleResendCode() {
            this.loading = true;
            try {
                const response = await apiRequest({
                    method: 'POST',
                    url: 'users/email/activate/request/',
                    data: {
                        email: this.email,
                    },
                });

                if (response.status === 200) {
                    alert('Un nouveau code a été envoyé à votre email.');
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
            return this.code.some(digit => digit === '');
        }
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <ScrollToTop />
        <div class="w-full max-w-5xl flex justify-center space-x-10">
            <!-- Section image -->
            <div class="w-1/2 rounded-3xl hidden lg:block">
                <img 
                    :src="otpImage"
                    class="w-full h-full object-cover rounded-3xl"
                    alt="Image de confirmation"
                />
            </div>

            <!-- Section formulaire -->
            <div class="w-full flex flex-col bg-white shadow-md rounded-2xl md:w-2/3 lg:w-1/2 p-8">
                <h1 class="text-2xl font-bold text-center mb-4">Vérification d'OTP</h1>
                <p class="text-center text-gray-600 mb-8">
                    Un code a été envoyé à <span class="font-semibold">{{ email }}</span>.<br>
                    Veuillez entrer le code à 5 chiffres.
                </p>

                <!-- Champs de saisie OTP -->
                <div class="flex justify-between gap-3 mb-8">
                    <input
                        v-for="(digit, index) in code"
                        :key="index"
                        :ref="`input-${index}`"
                        v-model="code[index]"
                        type="text"
                        maxlength="1"
                        class="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2] outline-none"
                        @input="handleChange($event.target.value, index)"
                        @keyup="handleKeyPress(index, $event)"
                    />
                </div>

                <!-- Message d'erreur -->
                <div v-if="errors.general" class="text-red-500 text-sm text-center mb-4">
                    {{ errors.general }}
                </div>

                <!-- Boutons -->
                <div class="space-y-4">
                    <button 
                        @click="handleSubmit"
                        :disabled="isButtonDisabled || loading"
                        class="w-full bg-[#0056D2] text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 btn btn-primary"
                        :class="{ 'loading': loading }"
                    >
                        <i class="fa-solid fa-sign-in-alt"></i>
                        {{ loading ? 'Chargement...' : 'Valider' }}
                    </button>

                    <div class="text-center">
                        <p class="text-gray-600 mb-2">Vous n'avez pas reçu de code ?</p>
                        <button 
                            @click="handleResendCode"
                            :disabled="loading"
                            class="text-[#0056D2] font-semibold hover:text-blue-700 btn btn-link"
                            :class="{ 'loading': loading }"
                        >
                            Renvoyer le code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input {
    -moz-appearance: textfield;
}
</style>