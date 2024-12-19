<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <!-- Header -->
      <header class="bg-white p-6 rounded shadow mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-700">Tableau de bord</h1>
        <button class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          Ajouter un cours
        </button>
      </header>
  
      <!-- Contenu principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Colonne principale -->
        <div class="lg:col-span-2">
          <!-- Section : Liste des cours -->
          
        <section class="bg-white p-6 rounded shadow">
            <h2 class="text-2xl font-bold text-blue-700 mb-4">Cours suivis</h2>
            <div class="space-y-4">
                <div
                v-for="course in courses"
                :key="course.id"
                class="flex items-start bg-gray-50 p-4 rounded shadow-sm hover:shadow-md transition-shadow"
                >
                <!-- Image ou icône -->
                <img
                    :src="course.image"
                    alt="Illustration du cours"
                    class="w-16 h-16 rounded object-cover mr-4"
                />

                    <!-- Détails du cours -->
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800">{{ course.title }}</h3>
                        <p class="text-sm text-gray-500 mb-2">{{ course.category }}</p>
                        <p class="text-sm text-gray-600">
                        Démarré le : <span class="font-semibold">{{ course.startDate }}</span>
                        </p>
                    </div>

                    <!-- Progression -->
                    <div class="flex items-center">
                        <div class="flex flex-col items-center">
                            <div class="relative w-12 h-12">
                                <svg class="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    class="text-gray-200"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke-width="3"
                                />
                                <path
                                    class="text-blue-600"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831"
                                    fill="none"
                                    stroke-width="3"
                                    stroke-dasharray="100"
                                    :stroke-dasharray="course.progress + ', 100'"
                                    stroke-linecap="round"
                                />
                                </svg>
                                <span
                                class="absolute inset-0 flex items-center justify-center text-sm font-semibold text-blue-600"
                                >
                                {{ course.progress }}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

  
          <!-- Section : Prochain objectif -->
          <section class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-bold text-blue-700 mb-4">Prochain objectif</h2>
            <p class="text-gray-600">
              Continuez le chapitre "{{ nextObjective.chapter }}" du cours
              <span class="text-blue-600 font-bold">{{ nextObjective.course }}</span>.
            </p>
            <button class="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Continuer
            </button>
          </section>
        </div>
  
        <!-- Colonne secondaire -->
        <div>
          <!-- Progression globale -->
          <section class="bg-white p-6 rounded shadow text-center">
            <h2 class="text-xl font-bold text-blue-700 mb-4">Progression</h2>
            <div class="relative w-32 h-32 mx-auto">
              <svg class="w-full h-full" viewBox="0 0 36 36">
                <path
                  class="text-gray-200"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke-width="2"
                />
                <path
                  class="text-orange-500"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke-width="2"
                  stroke-dasharray="75, 100"
                  stroke-linecap="round"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-bold text-orange-500">75%</span>
              </div>
            </div>
          </section>
  
          <!-- Statistiques -->
          <section class="bg-white p-6 rounded shadow mt-6">
            <h2 class="text-xl font-bold text-blue-700 mb-4">Statistiques</h2>
            <ul class="text-gray-600 space-y-2">
              <li>Cours terminés : <span class="font-bold">5</span></li>
              <li>Chapitres validés : <span class="font-bold">18</span></li>
              <li>Heures d'apprentissage : <span class="font-bold">12</span></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        courses: [
          {
            id: 1,
            title: "Simplifiez-vous le CSS avec Sass",
            category: "DÉVELOPPEMENT",
            progress: 83,
            startDate: "5 nov. 2024",
            image: "https://via.placeholder.com/64", // Remplacer par une vraie URL
          },
          {
            id: 2,
            title: "Réalisez la maquette d’une application mobile avec Adobe XD",
            category: "DESIGN",
            progress: 7,
            startDate: "15 oct. 2024",
            image: "https://via.placeholder.com/64",
          },
          {
            id: 3,
            title: "Créez des sites web responsives avec Bootstrap 5",
            category: "DÉVELOPPEMENT",
            progress: 85,
            startDate: "6 juil. 2023",
            image: "https://via.placeholder.com/64",
          },
          {
            id: 4,
            title: "Créez des pages web dynamiques avec JavaScript",
            category: "DÉVELOPPEMENT",
            progress: 33,
            startDate: "6 août 2024",
            image: "https://via.placeholder.com/64",
          },
        ],
        nextObjective: {
          course: "Développement Web Avancé",
          chapter: "API REST",
        },
      };
    },
  };
  </script>