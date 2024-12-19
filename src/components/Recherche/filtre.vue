<template>
    <div class="bg-gray-100 p-4 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Filtres</h2>
  
      <!-- Filtrer par catégorie -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold">Catégorie</h3>
        <ul class="mt-2">
          <li v-for="category in categories" :key="category">
            <label class="flex items-center">
              <input
                type="checkbox"
                :value="category"
                v-model="selectedCategories"
                @change="applyFilters"
                class="form-checkbox text-blue-600"
              />
              <span class="ml-2">{{ category }}</span>
            </label>
          </li>
        </ul>
      </div>
  
      <!-- Filtrer par difficulté -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold">Difficulté</h3>
        <ul class="mt-2">
          <li v-for="level in difficultyLevels" :key="level">
            <label class="flex items-center">
              <input
                type="checkbox"
                :value="level"
                v-model="selectedLevels"
                @change="applyFilters"
                class="form-checkbox text-blue-600"
              />
              <span class="ml-2">{{ level }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        default: () => ["Développement", "Design", "Marketing", "Data Science"],
      },
      difficultyLevels: {
        type: Array,
        default: () => ["Débutant", "Intermédiaire", "Avancé"],
      },
    },
    data() {
      return {
        selectedCategories: [],
        selectedLevels: [],
      };
    },
    methods: {
      applyFilters() {
        this.$emit("filters-changed", {
          categories: this.selectedCategories,
          difficultyLevels: this.selectedLevels,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style pour les filtres */
  </style>
  