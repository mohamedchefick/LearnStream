<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
    <router-link to="/">
      <img :src="IMGLogo" class="w-28 h-12 mb-8" alt="IMGLogo">
    </router-link>
    
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Votre Certificat</h2>

    <!-- Affichage de l'image du certificat -->
    <div class="mb-6 max-w-3xl w-full" style="aspect-ratio: 1.37">
      <img 
        v-if="certificateData" 
        :src="certificateData.certificate_png_url"
        alt="Certificat" 
        class="w-full h-full rounded-lg shadow-md"
      />
      <div v-else class="animate-pulse h-full">
        <div class="h-full bg-gray-200 rounded-lg">
          <div class="h-full flex items-center justify-center">
            <div class="space-y-4 w-1/2">
              <div class="h-8 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <!-- Animation de chargement -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>

    <!-- Bouton de téléchargement PDF -->
    <button 
      v-if="certificateData"
      @click="downloadPDF"
      class="btn btn-primary text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2"
    >
      <i class="fas fa-download"></i>
      Télécharger le PDF
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiRequest } from '../../utils/api';
import IMGLogo from "../../assets/images/img-logo.webp";

const route = useRoute();
const certificateData = ref(null);

const fetchCertificate = async () => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: `certification/courses/${route.params.courseId}/`
    });
    certificateData.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement du certificat:', error);
  }
};

const downloadPDF = () => {
  if (certificateData.value?.certificate_pdf_url) {
    window.open(certificateData.value.certificate_pdf_url, '_blank');
  }
};

onMounted(() => {
  fetchCertificate();
});
</script>