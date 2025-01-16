
<script setup>
import { ref } from "vue";
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import Temoin from '../../assets/icons/temoin.svg';
import Precedent from '../../assets/icons/precedent.svg';
import Suivant from '../../assets/icons/suivant.svg';
import Img1 from '../../assets/images/Img1.webp';
import Img2 from '../../assets/images/Img2.webp';

// Données des témoignages
const testimonials = ref([
  {
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    comment:
      "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.",
    image: Img1, // Remplacer par l'image réelle
  },
  {
    name: "Roan Salvador",
    role: "Data Analyst",
    comment:
      "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.",
    image: Img2,
  },
  {
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    comment:
      "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.",
    image: Img1, // Remplacer par l'image réelle
  },
  {
    name: "Roan Salvador",
    role: "Data Analyst",
    comment:
      "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.",
    image: Img2,
  },
  {
    name: "Jenny Wilson",
    role: "UI/UX Designer",
    comment:
      "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.",
    image: Img1, // Remplacer par l'image réelle
  },
  {
    name: "Roan Salvador",
    role: "Data Analyst",
    comment:
      "Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.Ut pharetra ipsum nec leo blandit, sit amet tincidunt eros pharetra. Nam sed imperdiet turpis. In hac habitasse platea dictumst.",
    image: Img2,
  },
  // Ajouter plus de témoignages ici
]);

// Indice de la diapositive active
const currentIndex = ref(0);

// Aller à la diapositive précédente
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 2 + testimonials.value.length) %
    testimonials.value.length;
};

// Aller à la diapositive suivante
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};

// Aller à une diapositive spécifique
const goToSlide = (index) => {
  currentIndex.value = index;
};
</script>

<template>
    <div class="bg-white py-12 px-6 lg:px-20">
      <!-- Titre -->
      <div class="text-[0056D2] text-2xl mb-10">
        <h2 class="text-2xl lg:text-3xl font-bold text-[#0056D2] mb-6">
          Nos étudiants témoignent
          <img :src="iconDecouvrir" class="w-1/5 mt-1 ms-20" alt="">
        </h2>
      <!-- Témoignages Carousel -->
      <div class="relative flex items-center mt-10">
        <!-- Témoignages -->
        <div class="overflow-hidden w-full">
          <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
          <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full md:w-1/2 flex-shrink-0 px-4"
          >
              <div class="bg-white border rounded-lg shadow-md p-6 ">
              <!-- Contenu -->
              <div class="flex items-center mb-4">
                  <img
                  :src="testimonial.image"
                  alt="Avatar"
                  class="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                  <h3 class="font-semibold text-gray-800">
                      {{ testimonial.name }}
                  </h3>
                  <p class="text-sm text-gray-500">
                      {{ testimonial.role }}
                  </p>
                  </div>
                  <div class="text-[#F7B32B] text-3xl ml-auto font-bold">
                      <img :src="Temoin" alt="" >
                  </div>
                  <!-- <span class="text-[#F7B32B] text-3xl ml-auto font-bold">“</span> -->
              </div>

              <p class="text-gray-600 text-sm leading-relaxed">
                  {{ testimonial.comment }}
              </p>
              </div>
            </div>
          </div>
        </div>
        </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-4">
            <span
                v-for="(dot, index) in testimonials"
                :key="index"
                @click="goToSlide(index)"
                class="w-3 h-3 mx-1 rounded-full cursor-pointer"
                :class="{
                'bg-[#0056D2]': currentIndex === index,
                'bg-gray-300': currentIndex !== index,
                }"
            ></span>
            </div>
        </div>
        <div class="flex justify-between w-1/3">
            <!-- Bouton précédent -->
            <button
                @click="prevSlide"
                class="absolute right-20 bg-white shadow-md rounded-lg p-2 hover:bg-gray-100 transition hover:scale-105 transition-transform duration-300"
            >
                <img :src="Precedent" alt="Précédent" class="w-5 h-5" />
            </button>

            <!-- Bouton suivant -->
            <button
                @click="nextSlide"
                class="absolute right-10 bg-[#0056D2] shadow-md rounded-lg p-2  transition hover:scale-105 transition-transform duration-300"
            >
                <img :src="Suivant" alt="Suivant" class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>


<style scoped>
/* Transition des slides */
.transition-transform {
  transition: transform 0.5s ease-in-out;
}
</style>