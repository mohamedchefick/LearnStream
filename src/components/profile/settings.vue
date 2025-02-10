<script setup>
import { ref, onMounted, computed } from 'vue';
import { apiFormDataRequest, apiRequest } from '../../utils/api.ts';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const toast = useToast();

const loading = ref(false);
const loadingPassword = ref(false);
const loadingDelete = ref(false);

const userData = ref(JSON.parse(localStorage.getItem('userData')));
const userInitials = ref(userData.value.first_name[0] + userData.value.last_name[0]);
const showDeleteModal = ref(false);
const showPasswordModal = ref(false);

const passwordForm = ref({
    old_password: '',
    new_password: '',
    confirm_password: ''
});

const initialFormData = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone_number: userData.value.phone_number || '',
    bio: userData.value.bio || '',
    date_of_birth: userData.value.date_of_birth || '',
    ...(userData.value.profile_picture ? { profile_picture: userData.value.profile_picture } : {})
};

const formData = ref({...initialFormData});

const previewImage = ref(null);
const selectedFile = ref(null);

const hasChanges = computed(() => {
    return selectedFile.value !== null || 
           Object.keys(formData.value).some(key => 
               formData.value[key] !== initialFormData[key]
           );
});

onMounted(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const element = document.getElementById(hash);
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        previewImage.value = URL.createObjectURL(file);
        formData.value.profile_picture = file;
    }
};

const handleSubmit = async () => {
    loading.value = true;
    try {
        const formDataToSend = new FormData();
        
        Object.keys(formData.value).forEach(key => {
            if (key === 'profile_picture') {
                if (selectedFile.value) {
                    formDataToSend.append('profile_picture', selectedFile.value);
                }
            } else {
                formDataToSend.append(key, formData.value[key]);
            }
        });

        const response = await apiFormDataRequest({
            method: 'PATCH',
            url: 'users/profile/',
            data: formDataToSend,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.status === 200) {
            toast.success('Profil mis à jour avec succès');
            localStorage.setItem('userData', JSON.stringify(response.data));
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1000);
        }
    } catch (error) {
        toast.error('Une erreur est survenue lors de la mise à jour du profil');
        console.error('Erreur lors de la mise à jour du profil:', error);
    } finally {
        loading.value = false;
    }
};

const handlePasswordChange = async () => {
    if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
        toast.error('Les mots de passe ne correspondent pas');
        return;
    }

    loadingPassword.value = true;
    try {
        const response = await apiRequest({
            method: 'PUT',
            url: 'users/password/change/',
            data: {
                old_password: passwordForm.value.old_password,
                new_password: passwordForm.value.new_password
            }
        });

        if (response.status === 200) {
            toast.success('Mot de passe modifié avec succès');
            showPasswordModal.value = false;
            passwordForm.value = {
                old_password: '',
                new_password: '',
                confirm_password: ''
            };
        }
    } catch (error) {
        toast.error('Une erreur est survenue lors du changement de mot de passe');
        console.error('Erreur lors du changement de mot de passe:', error);
    } finally {
        loadingPassword.value = false;
    }
};

const logout = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  window.location.href = '/';
}

const confirmDelete = async () => {
    loadingDelete.value = true;
    try {
        const response = await apiRequest({
            method: 'DELETE',
            url: 'users/profile/',
        });
        if (response.status === 204) {
            toast.success('Votre compte a été supprimé avec succès');
            logout();
        }
    } catch (error) {
        toast.error('Une erreur est survenue lors de la suppression du compte');
        console.error('Erreur lors de la suppression du compte:', error);
    } finally {
        loadingDelete.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center bg-blue-50 shadow rounded-2xl p-8">
                <div class="flex items-center space-x-4">
                    <div class="relative w-28 h-28 mx-auto mb-4">
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
                            @change="handleFileChange"
                        />
                        <button 
                            class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full h-8 w-8 shadow-lg flex items-center justify-center"
                            onclick="document.getElementById('fileInput').click()"
                        >
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900">{{ userData.first_name }} {{ userData.last_name }}</h2>
                        <p class="text-gray-600">{{ userData.email }}</p>
                    </div>
                </div>
            </div>

            
            <form @submit.prevent="handleSubmit" class="space-y-6 p-8">
                <h3 class="text-2xl font-bold text-[#0056D2]">Vos informations</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Nom</span>
                        </label>
                        <input 
                            type="text" 
                            v-model="formData.last_name"
                            class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                            required
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold">Prénom</span>
                        </label>
                        <input 
                            id='first-name'
                            type="text" 
                            v-model="formData.first_name"
                            class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                            required
                        />
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Date de naissance</span>
                    </label>
                    <input 
                        id='date-of-birth'
                        type="date" 
                        v-model="formData.date_of_birth"
                        class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Email</span>
                    </label>
                    <input 
                        id='email'
                        type="email" 
                        v-model="formData.email"
                        class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Numéro de téléphone</span>
                    </label>
                    <input 
                        id='phone-number'
                        type="tel" 
                        v-model="formData.phone_number"
                        class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Bio</span>
                    </label>
                    <textarea 
                        id='bio'
                        v-model="formData.bio"
                        class="textarea bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                        placeholder="Parlez-nous de vous..."
                    ></textarea>
                </div>
                <div class="flex justify-end">
                    <button v-if="hasChanges" type="submit" class="btn btn-primary rounded-2xl text-white font-bold" :disabled="loading">
                        <span v-if="loading" class="loading loading-spinner"></span>
                        {{ loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                    </button>
                </div>
            </form>
            <div class="space-y-6 p-8">
                <h3 class="text-2xl font-bold text-[#0056D2]">Autres</h3>
                <div class="flex justify-between items-center space-y-2 flex-col md:flex-row">
                    <button @click="showPasswordModal = true" class="btn btn-ghost bg-blue-50 rounded-2xl hover:bg-blue-100 text-blue-800 hover:text-blue-800">
                        <i class="fas fa-key mr-2"></i>
                        Modifier votre mot de passe
                    </button>
                    <button @click="logout" class="btn btn-ghost bg-red-50 rounded-2xl hover:bg-red-100 text-red-800 hover:text-red-800">
                        <i class="fas fa-sign-out-alt mr-2"></i>
                        Déconnexion
                    </button>
                    <button @click="showDeleteModal = true" class="btn btn-ghost bg-red-800 rounded-2xl hover:bg-red-900 text-white hover:text-white">
                        <i class="fas fa-user-times mr-2"></i>
                        Supprimer mon compte
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <h3 class="text-2xl font-bold text-red-800 mb-4">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Confirmation de suppression
            </h3>
            <p class="text-gray-700 mb-4">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
            <div class="bg-red-50 p-4 rounded-lg mb-6">
                <p class="text-red-800 font-semibold mb-2">
                    <i class="fas fa-info-circle mr-2"></i>
                    En supprimant votre compte :
                </p>
                <div class="text-red-700 space-y-2 ps-3">
                    <div><i class="fas fa-graduation-cap mr-2"></i>Vous perdrez toutes vos progressions de cours</div>
                    <div><i class="fas fa-certificate mr-2"></i>Vos certificats ne pourront plus être vérifiés</div>
                    <div><i class="fas fa-trash-alt mr-2"></i>Toutes vos données seront définitivement effacées</div>
                </div>
            </div>
            <div class="flex justify-end space-x-4">
                <button @click="showDeleteModal = false" class="btn btn-ghost bg-gray-100 rounded-2xl hover:bg-gray-200 text-gray-800" :disabled="loadingDelete">
                    <i class="fas fa-times mr-2"></i>
                    Annuler
                </button>
                <button @click="confirmDelete" class="btn bg-red-800 hover:bg-red-900 text-white rounded-2xl" :disabled="loadingDelete">
                    <span v-if="loadingDelete" class="loading loading-spinner"></span>
                    <i v-else class="fas fa-trash-alt mr-2"></i>
                    {{ loadingDelete ? 'Suppression...' : 'Confirmer la suppression' }}
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de changement de mot de passe -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
            <h3 class="text-2xl font-bold text-blue-800 mb-4">
                <i class="fas fa-key mr-2"></i>
                Modification du mot de passe
            </h3>
            <form @submit.prevent="handlePasswordChange" class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Ancien mot de passe</span>
                    </label>
                    <input 
                        type="password" 
                        v-model="passwordForm.old_password"
                        class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nouveau mot de passe</span>
                    </label>
                    <input 
                        type="password" 
                        v-model="passwordForm.new_password"
                        class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                        required
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Confirmer le nouveau mot de passe</span>
                    </label>
                    <input 
                        type="password" 
                        v-model="passwordForm.confirm_password"
                        class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                        required
                    />
                </div>
                <div class="flex justify-end space-x-4 mt-6">
                    <button type="button" @click="showPasswordModal = false" class="btn btn-ghost bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl" :disabled="loadingPassword">
                        <i class="fas fa-times mr-2"></i>
                        Annuler
                    </button>
                    <button type="submit" class="btn bg-blue-800 hover:bg-blue-900 text-white rounded-2xl" :disabled="loadingPassword">
                        <span v-if="loadingPassword" class="loading loading-spinner"></span>
                        <i v-else class="fas fa-retweet mr-2"></i>
                        {{ loadingPassword ? 'Modification...' : 'Modifier' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
