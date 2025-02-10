<script setup>
import { ref } from 'vue';

const userData = ref(JSON.parse(localStorage.getItem('userData')));
const userInitials = ref(userData.value.first_name[0] + userData.value.last_name[0]);
console.log(userData)
</script>

<template>
    <div class="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center bg-blue-50 shadow rounded-2xl p-8">
                <div class="flex items-center space-x-4">
                    <img v-if="userData.profile_picture" :src="userData.profile_picture" alt="User Avatar" class="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <img v-else-if="userData.picture_url" :src="userData.picture_url" alt="User Avatar" class="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <div v-else class="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-4xl text-blue-600">{{ userInitials }}</span>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">{{ userData.first_name }} {{ userData.last_name }}</h2>
                        <p class="text-gray-600">{{ userData.email }}</p>
                    </div>
                </div>
                <router-link to="/settings" class="btn btn-primary rounded-full text-white">
                    <i class="fa-solid fa-edit"></i> Modifier le profil
                </router-link>
            </div>
        </div>
        <div class="max-w-5xl mx-auto mt-8">
            <div class="flex items-center space-x-2 mb-4">
                <i class="fa-solid fa-id-card text-6xl text-[#0056D2]"></i>
                <div>
                    <h3 class="text-xl font-bold text-[#0056D2]">Informations personnelles</h3>
                    <p class="text-sm text-gray-800 font-medium">Renseignez vos informations personnelles pour nous permettre de mieux vous connaître.</p>
                </div>
            </div>
            <div class="bg-blue-50 border border-gray-400 rounded-2xl p-4 mb-10">
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 rounded-lg">
                        <div class="flex items-center">
                            <p class="font-semibold w-60">Prénoms Nom:</p>
                            <p class="">{{ userData.first_name }} {{ userData.last_name }}</p>
                        </div>
                        <router-link to="/settings#first-name" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-chevron-right"></i>
                        </router-link>
                    </div>
                    <hr class="border-gray-400">
                    <div class="flex items-center justify-between p-4 rounded-lg">
                        <div class="flex items-center">
                            <p class="font-semibold w-60">Date de naissance:</p>
                            <p class="">{{ userData.date_of_birth ? new Date(userData.date_of_birth).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non renseigné' }}</p>
                        </div>
                        <router-link to="/settings#date-of-birth" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-chevron-right"></i>
                        </router-link>
                    </div>
                    <hr class="border-gray-400">
                    <div class="flex items-center justify-between p-4 rounded-lg">
                        <div class="flex items-center">
                            <p class="font-semibold w-60">Adresse Email:</p>
                            <p class="">{{ userData.email }}</p>
                        </div>
                        <router-link to="/settings#email" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-chevron-right"></i>
                        </router-link>
                    </div>
                    <hr class="border-gray-400">
                    <div class="flex items-center justify-between p-4 rounded-lg">
                        <div class="flex items-center">
                            <p class="font-semibold w-60">Téléphone:</p>
                            <p class="">{{ userData.phone_number || 'Non renseigné' }}</p>
                        </div>
                        <router-link to="/settings#phone-number" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-chevron-right"></i>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-2 mb-4">
                <i class="fa-solid fa-address-card text-6xl text-[#0056D2]"></i>
                <div>
                    <h3 class="text-xl font-bold text-[#0056D2]">À propos de vous</h3>
                    <p class="text-sm text-gray-800 font-medium">Renseignez vos informations personnelles pour nous permettre de mieux vous connaître.</p>
                </div>
            </div>
            <div class="bg-blue-50 border border-gray-400 rounded-2xl p-8">
                <div class="flex items-center justify-between p-4 rounded-lg">
                    <div class="flex items-center">
                        <p class="font-semibold w-60">Description</p>
                        <p class="">{{ userData.bio || 'Aucune description' }}</p>
                    </div>
                    <router-link to="/settings#bio" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>