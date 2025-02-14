<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Votre Certificat</h2>

    <!-- Affichage de l'image du certificat -->
    <div class="mb-6 max-w-3xl w-full min-h-[600px]">
      <img 
        v-if="certificateData" 
        :src="certificateData.certificate_png_url"
        alt="Certificat" 
        class="w-full h-auto rounded-lg shadow-md min-h-[600px]"
      />
      <div v-else class="animate-pulse">
        <div class="h-[600px] bg-gray-200 rounded-lg">
          <div class="h-full flex items-center justify-center">
            <div class="space-y-4 w-1/2">
              <div class="h-8 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
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