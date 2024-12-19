<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <!-- Barre de recherche -->
      <header class="bg-[#FFE9BC] text-blue-700 p-6 rounded-lg shadow mb-6">
        <h1 class="text-3xl font-bold">Recherche</h1>
        <p class="text-lg mt-2 text-black">Trouvez les cours, parcours ou leçons qui vous intéressent.</p>
        <div class="relative mt-6">
          <input
            type="text"
            v-model="query"
            @input="filterResults"
            placeholder="Recherchez un cours, un parcours, ou une leçon..."
            class="w-full p-4 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            @click="filterResults"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 11-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>
  
      <!-- Résultats et filtres -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Section filtres -->
        <aside class="col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold text-gray-700 mb-4">Filtres</h2>
          <div>
            <h3 class="text-lg font-semibold text-gray-600">Catégorie</h3>
            <ul class="mt-2 space-y-2">
              <li v-for="category in categories" :key="category">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    :value="category"
                    v-model="selectedCategories"
                    @change="filterResults"
                    class="form-checkbox text-blue-600"
                  />
                  <span class="ml-2 text-gray-700">{{ category }}</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>
  
        <!-- Section résultats -->
        <section class="col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-bold text-gray-700 mb-6">Résultats de la recherche</h2>
          <div v-if="filteredResults.length === 0" class="text-center text-gray-600">
            <p>Aucun résultat trouvé pour votre recherche.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" v-else>
            <div
              v-for="result in filteredResults"
              :key="result.id"
              class="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
              @click="viewDetails(result)"
            >
              <img
                :src="result.image"
                alt="Image du cours"
                class="w-full h-32 object-cover rounded-t-lg mb-4"
              />
              <h3 class="text-lg font-bold text-gray-800">{{ result.title }}</h3>
              <p class="text-gray-600 mt-2">{{ result.category }}</p>
              <p class="text-blue-600 mt-4 font-semibold">Voir plus</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: "",
        selectedCategories: [],
        categories: ["Développement", "Design", "Marketing", "Langues", "Data Science"],
        results: [
          {
            id: 1,
            title: "Simplifiez-vous le CSS avec Sass",
            category: "Développement",
            image: "/images/course1.jpg",
          },
          {
            id: 2,
            title: "Créez des maquettes avec Adobe XD",
            category: "Design",
            image: "/images/course2.jpg",
          },
          {
            id: 3,
            title: "Apprenez le marketing digital",
            category: "Marketing",
            image: "/images/course3.jpg",
          },
        ],
        filteredResults: [],
      };
    },
    created() {
      this.filteredResults = this.results;
    },
    methods: {
      filterResults() {
        const queryLower = this.query.toLowerCase();
        this.filteredResults = this.results.filter((result) => {
          const matchesQuery = result.title.toLowerCase().includes(queryLower);
          const matchesCategory =
            this.selectedCategories.length === 0 || this.selectedCategories.includes(result.category);
          return matchesQuery && matchesCategory;
        });
      },
      viewDetails(result) {
        alert(`Détails du cours : ${result.title}`);
        // Rediriger vers une autre page si nécessaire
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajout de styles pour les boutons, les cartes et la mise en page */
  </style>
  