<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
    <div class="flex items-center justify-between w-full max-w-5xl mb-4">
      <img
        style="cursor: pointer"
        onclick="window.location.href = '/'"
        :src="wisoriaLogo" 
        alt="Logo Wisoria"
        class="w-36 h-auto"
      />
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Vérification de Certificat</h2>
      </div>
    </div>
    
    <p class="text-gray-600">Consultez l'authenticité d'un certificat Wisoria</p>
    <div class="mb-6 max-w-3xl w-full min-h-[600px]">
      <div v-if="certificateData && certificateData.has_certificate">
        
        <div class="relative">
          <img 
            :src="certificateData.certificate_png_url"
            alt="Certificat" 
            class="w-full h-auto rounded-lg shadow-md min-h-[400px]"
            loading="lazy"
          />
          <div class="absolute top-4 right-4">
            <div class="inline-flex items-center px-4 py-2 bg-green-100/90 backdrop-blur text-green-700 rounded-full shadow">
              <i class="fas fa-check-circle mr-2"></i>
              Ce certificat est authentique
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <button 
            @click="downloadPDF"
            class="btn btn-primary text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center gap-2"
          >
            <i class="fas fa-download"></i>
            Télécharger le PDF
          </button>
        </div>
      </div>

      <div v-else-if="certificateData && !certificateData.has_certificate" class="text-center">
        <div class="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full">
          <i class="fas fa-times-circle mr-2"></i>
          Ce certificat n'est pas valide
        </div>
      </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiRequest } from '../../utils/api';
import wisoriaLogo from "../../assets/images/img-logo.webp"

const route = useRoute();
const certificateData = ref(null);

const fetchCertificate = async () => {
  try {
    const response = await apiRequest({
      method: 'GET',
      url: `certification/courses/check/${route.params.certificateId}/`
    });
    certificateData.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification du certificat:', error);
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
