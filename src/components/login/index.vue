<script>
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import { apiRequest } from '../../utils/api';
import logo from '../../assets/images/img-logo.webp';
import loginImage from '../../assets/images/login-image.png';
import registerImage from '../../assets/images/register-image.png';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default {
    data() {
        return {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            iconDecouvrir,
            logo,
            loading: false,
            resetLoading: false,
            activeTab: "login",
            loginImage,
            registerImage,
            errors: {},
            toast: useToast(),
            shakeEmail: false
        };
    },
    mounted() {
        // Vérifier si l'URL contient #signup
        if (window.location.hash === '#signup') {
            this.activeTab = 'register';
        }
    },
    computed: {
        showLoginButton() {
            return this.email && this.password;
        },
        showRegisterButton() {
            return this.email && this.password && this.firstName && this.lastName;
        }
    },
    methods: {
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        async handleLogin() {
            if (!this.email) {
                this.shakeEmail = true;
                setTimeout(() => {
                    this.shakeEmail = false;
                }, 500);
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.toast.error("Veuillez saisir une adresse email valide");
                this.shakeEmail = true;
                setTimeout(() => {
                    this.shakeEmail = false;
                }, 500);
                return;
            }

            this.loading = true;
            try {
                const response = await apiRequest({
                    method: 'POST',
                    url: 'users/login/',
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                });

                if (response.status !== 200) {
                    this.toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
                    throw new Error("Échec de la connexion. Veuillez vérifier vos identifiants.");
                }

                const data = response.data;
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('userData', JSON.stringify(data.user));
                localStorage.setItem('email', this.email);
                localStorage.setItem('password', this.password);

                this.toast.success(`Bienvenue ${data.user.first_name}!`);
                this.$router.push({ name: 'Home' });
            } catch (error) {
                if (error.response && error.response.data.non_field_errors) {
                    for (const message of error.response.data.non_field_errors) {
                        this.toast.error(message);
                    }
                }
            } finally {
                this.loading = false;
            }
        },
        async handleSignUp() {
            if (!this.email || !this.password || !this.firstName || !this.lastName) {
                this.errors = { general: "Tous les champs sont obligatoires." };
                if (!this.email) {
                    this.shakeEmail = true;
                    setTimeout(() => {
                        this.shakeEmail = false;
                    }, 500);
                }
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.errors = { general: "Veuillez saisir une adresse email valide" };
                this.shakeEmail = true;
                setTimeout(() => {
                    this.shakeEmail = false;
                }, 500);
                return;
            }

            this.loading = true;
            try {
                const response = await apiRequest({
                    method: "POST",
                    url: "users/register/",
                    data: {
                        first_name: this.firstName,
                        last_name: this.lastName,
                        email: this.email,
                        password: this.password,
                    },
                });

                if (!response.status.toString().startsWith('2')) {
                    throw new Error(response.status.toString());
                }

                localStorage.setItem('email', this.email);
                localStorage.setItem('password', this.password);

                this.errors = {};
                
                this.$router.push(`/email-activate-confirm`);
            } catch (error) {
                if (error.response?.data) {
                    this.errors = error.response.data;
                } else {
                    this.errors = { general: error.message };
                }
            } finally {
                this.loading = false;
            }
        },
        switchTab(tab) {
            this.activeTab = tab;
        },
        async handleForgotPassword() {
            if (!this.email) {
                this.shakeEmail = true;
                setTimeout(() => {
                    this.shakeEmail = false;
                }, 500);
                this.toast.warning("Veuillez saisir votre adresse email avant de réinitialiser le mot de passe");
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.toast.error("Veuillez saisir une adresse email valide");
                this.shakeEmail = true;
                setTimeout(() => {
                    this.shakeEmail = false;
                }, 500);
                return;
            }

            this.resetLoading = true;
            try {
                await apiRequest({
                    method: 'POST',
                    url: 'users/password/reset/request/',
                    data: {
                        email: this.email
                    }
                });
                localStorage.setItem('email', this.email);
                this.$router.push('/password-reset');
            } catch (error) {
                this.toast.error(error.response.data.detail || "Une erreur est survenue lors de la demande de réinitialisation");
            } finally {
                this.resetLoading = false;
            }
        }
    },
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-5xl flex justify-center space-x-10 flex-row">
            <!-- Section image -->
            <div class="w-1/2 rounded-3xl hidden lg:block overflow-hidden">
                <img 
                    :src="activeTab === 'login' ? loginImage : registerImage"
                    class="w-full h-full object-cover"
                    :alt="activeTab === 'login' ? 'Image de connexion' : 'Image d\'inscription'"
                />
            </div>

            <!-- Section formulaire -->
            <div class="w-full flex flex-col md:w-2/3 lg:w-1/2 p-8">
                <!-- Tabs -->
                <h2 class="mb-5 text-center font-semibold">Bienvenue sur <img :src="logo" class="h-10 inline-block" /></h2>

                <div class="flex bg-blue-200 rounded-full mx-auto justify-center mb-8 p-2 gap-2">
                    <button 
                        class="px-6 py-2 rounded-full transition-colors font-bold"
                        :class="activeTab === 'login' ? 'bg-[#0056D2] text-white' : 'bg-transparent'" 
                        @click="switchTab('login')"
                    >
                        Connexion
                    </button>
                    <button 
                        class="px-6 py-2 rounded-full transition-colors font-bold"
                        :class="activeTab === 'register' ? 'bg-[#0056D2] text-white' : 'bg-transparent'"
                        @click="switchTab('register')"
                    >
                        Inscription
                    </button>
                </div>
                <div class="text-center mb-8">
                    <p class="text-sm text-gray-500">Plongez dans un apprentissage simplifié, libre et accessible.</p>
                </div>

                <!-- Formulaire de connexion -->
                <div v-if="activeTab === 'login'" class="space-y-6">
                    <form @submit.prevent="handleLogin" class="space-y-4">
                        <div class="form-control" :class="{ 'animate-shake': shakeEmail }">
                            <input 
                                type="email"
                                v-model="email"
                                placeholder="Adresse Email" 
                                class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                required
                            />
                        </div>

                        <div class="form-control">
                            <input 
                                type="password"
                                v-model="password"
                                placeholder="Mot de passe"
                                class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                required
                            />
                        </div>

                        <div class="text-sm text-right">
                            <button 
                                @click="handleForgotPassword" 
                                type="button"
                                class="link link-primary cursor-pointer"
                                :class="{ 'loading': resetLoading }"
                                :disabled="resetLoading"
                            >
                                Mot de passe oublié ?
                            </button>
                        </div>

                        <div class="flex justify-end">
                            <button 
                                v-if="showLoginButton"
                                type="submit"
                                class="btn btn-primary rounded-full"
                                :class="{ 'loading': loading }"
                            >
                              <i class="fa-solid fa-sign-in-alt"></i>
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Formulaire d'inscription -->
                <div v-if="activeTab === 'register'" class="space-y-6">
                    <form @submit.prevent="handleSignUp" class="space-y-4">
                        <div v-if="errors.general" class="text-red-500 text-sm">
                            {{ errors.general }}
                        </div>
                        
                        <div class="form-control">
                            <input 
                                type="text"
                                v-model="firstName"
                                placeholder="Prénom"
                                class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                required
                            />
                        </div>

                        <div class="form-control">
                            <input 
                                type="text"
                                v-model="lastName"
                                placeholder="Nom"
                                class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                required
                            />
                        </div>

                        <div class="form-control" :class="{ 'animate-shake': shakeEmail }">
                            <input 
                                type="email"
                                v-model="email"
                                placeholder="Adresse Email"
                                class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                required
                            />
                        </div>

                        <div class="form-control">
                            <input 
                                type="password"
                                v-model="password"
                                placeholder="Mot de passe"
                                class="input input-bordered border-gray-500 border-2 rounded-full focus:border-[#FFA600] focus:ring-[#0056D2] focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                required
                            />
                        </div>

                        <div class="flex justify-end">
                            <button 
                                v-if="showRegisterButton"
                                type="submit"
                                class="btn btn-primary rounded-full"
                                :class="{ 'loading': loading }"
                            >
                              <i class="fa-solid fa-user-plus"></i>
                                S'inscrire
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
</style>