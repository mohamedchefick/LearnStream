<script setup>
import { ref } from 'vue';
import { apiFormDataRequest } from '../../utils/api.ts';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const toast = useToast();

const userData = ref(JSON.parse(localStorage.getItem('userData')));
const userInitials = ref(userData.value.first_name[0] + userData.value.last_name[0]);

const formData = ref({
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone_number: userData.value.phone_number || '',
    bio: userData.value.bio || '',
    profile_picture: userData.value.profile_picture || ''
});

const handleSubmit = async () => {
    try {
        const response = await apiFormDataRequest({
            method: 'PATCH',
            url: 'users/profile/', 
            data: formData.value
        });
        
        if (response.status === 200) {
            toast.success('Profil mis à jour avec succès');
            // Mise à jour des données utilisateur dans le localStorage
            localStorage.setItem('userData', JSON.stringify(response.data));
        }
    } catch (error) {
        toast.error('Une erreur est survenue lors de la mise à jour du profil');
        console.error('Erreur lors de la mise à jour du profil:', error);
    }
};
</script>

<template>
    <div class="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
                <div class="relative w-32 h-32 mx-auto mb-4">
                    <img v-if="previewImage" :src="previewImage" alt="Photo de profil" class="w-full h-full rounded-full object-cover">
                    <img v-else-if="userData.profile_picture" :src="userData.profile_picture" alt="Photo de profil" class="w-full h-full rounded-full object-cover">
                    <img v-else-if="userData.picture_url" :src="userData.picture_url" alt="Photo de profil" class="w-full h-full rounded-full object-cover">
                    <div v-else class="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-5xl text-blue-600">{{ userInitials }}</span>
                    </div>
                    <input 
                        type="file" 
                        id="fileInput" 
                        accept="image/*" 
                        class="hidden" 
                        onchange="previewImage(event)" 
                    />

                    <!-- Bouton pour charger une image -->
                    <button 
                        class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full h-10 w-10 shadow-lg flex items-center justify-center"
                        onclick="document.getElementById('fileInput').click()"
                    >
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6 bg-blue-50 rounded-2xl p-8">
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Prénom</span>
                        </label>
                        <input 
                            type="text" 
                            v-model="formData.first_name"
                            class="input input-bordered w-full rounded-full"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Nom</span>
                        </label>
                        <input 
                            type="text" 
                            v-model="formData.last_name"
                            class="input input-bordered w-full rounded-full"
                            required
                        />
                    </div>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Email</span>
                    </label>
                    <input 
                        type="email" 
                        v-model="formData.email"
                        class="input input-bordered w-full rounded-full"
                        required
                    />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Numéro de téléphone</span>
                    </label>
                    <input 
                        type="tel" 
                        v-model="formData.phone_number"
                        class="input input-bordered w-full rounded-full"
                    />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Bio</span>
                    </label>
                    <textarea 
                        v-model="formData.bio"
                        class="textarea textarea-bordered h-24 rounded-xl"
                        placeholder="Parlez-nous de vous..."
                    ></textarea>
                </div>

                <div class="flex justify-end">
                    <button type="submit" class="btn btn-primary rounded-full">
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
