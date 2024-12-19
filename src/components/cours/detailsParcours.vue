<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <!-- En-tête -->
      <header class="bg-[#FFE9BC] text-blue-700 p-6 rounded-lg shadow mb-6">
        <h1 class="text-3xl font-bold">{{ course.title }}</h1>
        <p class="text-lg mt-2 text-black">{{ course.category }} • {{ course.progress }}% complété</p>
      </header>
  
      <!-- Contenu principal -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Section principale -->
        <section class="col-span-8 bg-white p-6 rounded shadow">
          <!-- Description -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">À propos de ce parcours</h2>
          <p class="text-gray-700 mb-6">{{ course.description }}</p>
  
          <!-- Modules et leçons -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Modules</h2>
          <div class="space-y-4">
            <div
              v-for="module in course.modules"
              :key="module.id"
              class="p-4 bg-gray-50 rounded shadow-sm"
            >
              <h3 class="text-lg font-semibold text-gray-800">{{ module.title }}</h3>
              <ul class="mt-2 space-y-2">
                <li
                  v-for="lesson in module.lessons"
                  :key="lesson.id"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-600">{{ lesson.title }}</span>
                  <button
                    class="text-sm text-blue-600 font-semibold"
                    @click="startLesson(lesson)"
                  >
                    {{ lesson.completed ? "Revoir" : "Commencer" }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- Section latérale -->
        <aside class="col-span-4 bg-white p-6 rounded shadow">
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Progression</h2>
          <div class="relative w-32 h-32 mx-auto mb-6">
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
                class="text-orange-500"
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
              class="absolute inset-0 flex items-center justify-center text-lg font-semibold text-orange-500"
            >
              {{ course.progress }}%
            </span>
          </div>
          <button
            class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
            @click="resumeCourse"
          >
            Reprendre le parcours
          </button>
        </aside>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        course: {
          title: "Créez des pages web dynamiques avec JavaScript",
          category: "DÉVELOPPEMENT",
          progress: 33,
          description:
            "Dans ce parcours, vous apprendrez à utiliser JavaScript pour rendre vos sites web dynamiques et interactifs. Ce parcours couvre les bases, les événements, le DOM, et des projets concrets.",
          modules: [
            {
              id: 1,
              title: "Introduction à JavaScript",
              lessons: [
                { id: 1, title: "Qu'est-ce que JavaScript ?", completed: true },
                { id: 2, title: "Variables et types", completed: false },
                { id: 3, title: "Opérations de base", completed: false },
              ],
            },
            {
              id: 2,
              title: "Manipulation du DOM",
              lessons: [
                { id: 4, title: "Sélecteurs et événements", completed: false },
                { id: 5, title: "Modification des éléments", completed: false },
                { id: 6, title: "Gestion des formulaires", completed: false },
              ],
            },
          ],
        },
      };
    },
    methods: {
      startLesson(lesson) {
        alert(`Leçon sélectionnée : ${lesson.title}`);
        // Logique pour démarrer/reprendre une leçon
      },
      resumeCourse() {
        alert("Reprendre le parcours...");
        // Logique pour reprendre le parcours
      },
    },
  };
  </script>
  