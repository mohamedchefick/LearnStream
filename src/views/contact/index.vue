<script setup>
import Headers from '../../components/Helper/Header/index.vue';
import Footer from '../../components/Helper/Footer/index.vue';
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import ScrollToTop from '../../components/Helper/scrollToTop.vue';  
import { ref } from 'vue';
import { apiRequest } from '../../utils/api.ts';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const toast = useToast();
const loading = ref(false);

const userData = ref(JSON.parse(localStorage.getItem('userData')));

const formData = ref({
  ...(userData.value ? {
    first_name: '',
    last_name: '',
    email: ''
  } : {}),
  sujet: '',
  content: ''
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const response = await apiRequest({
      method: 'POST',
      url: '/administration/create-message/',
      data: formData.value
    });

    if (response.status === 201) {
      toast.success('Message envoyé avec succès');
      formData.value = {
        ...(userData.value ? {
          first_name: '',
          last_name: '',
          email: ''
        } : {}),
        sujet: '',
        content: ''
      };
    }
  } catch (error) {
    toast.error('Une erreur est survenue lors de l\'envoi du message');
    console.error('Erreur lors de l\'envoi du message:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Headers />
  <ScrollToTop />

  <div class="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center bg-blue-50 shadow rounded-2xl p-8">
        <div>
          <h2 class="text-2xl font-bold text-[#0056D2]">Formulaire de contact</h2>
          <div class="flex mt-2">
            <img :src="iconDecouvrir" class="w-40" alt="">
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="space-y-6 p-8">
          <h3 class="text-2xl font-bold text-[#0056D2]">Votre message</h3>
          <p class="text-gray-600">Veuillez remplir le formulaire ci-dessous pour nous en dire plus sur vos préoccupations</p>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div v-if="!userData" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Nom</span>
                </label>
                <input 
                  type="text" 
                  v-model="formData.last_name"
                  placeholder="Votre nom" 
                  class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Prénom</span>
                </label>
                <input 
                  type="text"
                  v-model="formData.first_name" 
                  placeholder="Votre prénom"
                  class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                  required
                />
              </div>
            </div>

            <div v-if="!userData" class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Adresse e-mail</span>
              </label>
              <input 
                type="email"
                v-model="formData.email"
                placeholder="Votre adresse mail"
                class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Sujet</span>
              </label>
              <input 
                type="text"
                v-model="formData.sujet"
                placeholder="Le sujet de votre message"
                class="input bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Votre préoccupation</span>
              </label>
              <textarea 
                v-model="formData.content"
                class="textarea bg-blue-50 w-full shadow focus:border-none focus:outline-none focus:ring-0 h-32"
                placeholder="Quelle est votre préoccupation?"
                required
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary rounded-2xl text-white font-bold" :disabled="loading">
                <span v-if="loading" class="loading loading-spinner"></span>
                {{ loading ? 'Envoi...' : 'Envoyer le message' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>