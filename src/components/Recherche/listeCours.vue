<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <!-- Titre de la page -->
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Tous les cours</h1>
        <p class="text-gray-600">Découvrez les cours disponibles sur notre plateforme.</p>
      </header>
  
      <!-- Contenu avec grille et filtres -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Section filtres -->
        <aside>
          <Filtre
            :categories="categories"
            :difficultyLevels="difficultyLevels"
            @filters-changed="updateFilters"
          />
        </aside>
  
        <!-- Section cours -->
        <section class="col-span-3">
          <div v-if="filteredCourses.length === 0" class="text-center text-gray-600">
            <p>Aucun cours trouvé avec les filtres appliqués.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" v-else>
            <div
              v-for="course in filteredCourses"
              :key="course.id"
              class="bg-white p-4 rounded-lg shadow hover:shadow-lg"
            >
              <img
                :src="course.image"
                alt="Image du cours"
                class="w-full h-32 object-cover rounded-t-lg"
              />
              <h3 class="text-lg font-bold mt-4">{{ course.title }}</h3>
              <p class="text-gray-600">{{ course.category }}</p>
              <p class="text-sm text-gray-500 mt-2">Difficulté : {{ course.difficulty }}</p>
              <button
                class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                @click="viewCourse(course)"
              >
                Voir le cours
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import Filtre from "./filtre.vue";
  
  export default {
    components: { Filtre },
    data() {
      return {
        categories: ["Développement", "Design", "Marketing", "Data Science"],
        difficultyLevels: ["Débutant", "Intermédiaire", "Avancé"],
        courses: [
          {
            id: 1,
            title: "Apprenez le CSS avec Sass",
            category: "Développement",
            difficulty: "Débutant",
            image: "/images/course1.jpg",
          },
          {
            id: 2,
            title: "Créer des maquettes avec Figma",
            category: "Design",
            difficulty: "Intermédiaire",
            image: "/images/course2.jpg",
          },
          {
            id: 3,
            title: "Marketing digital pour débutants",
            category: "Marketing",
            difficulty: "Débutant",
            image: "/images/course3.jpg",
          },
        ],
        filteredCourses: [],
      };
    },
    created() {
      this.filteredCourses = this.courses; // Initialisation sans filtre
    },
    methods: {
      updateFilters(filters) {
        this.filteredCourses = this.courses.filter((course) => {
          const matchesCategory =
            filters.categories.length === 0 || filters.categories.includes(course.category);
          const matchesDifficulty =
            filters.difficultyLevels.length === 0 || filters.difficultyLevels.includes(course.difficulty);
          return matchesCategory && matchesDifficulty;
        });
      },
      viewCourse(course) {
        alert(`Accéder aux détails du cours : ${course.title}`);
        // Redirigez vers la page du cours ici si nécessaire
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajout de styles pour le design */
  </style>
  