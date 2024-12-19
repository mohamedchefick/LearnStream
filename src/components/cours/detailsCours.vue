<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <!-- En-tête -->
      <header class="bg-[#FFE9BC] text-blue-700 p-6 rounded-lg shadow mb-6">
        <h1 class="text-3xl font-bold">{{ course.title }}</h1>
        <p class="text-lg mt-2 text-black">{{ course.category }} • Niveau : {{ course.level }}</p>
        <p class="mt-4 text-black">{{ course.description }}</p>
      </header>
  
      <!-- Contenu principal -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Section principale -->
        <section class="col-span-8 bg-white p-6 rounded shadow">
          <!-- Objectifs d'apprentissage -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Objectifs d’apprentissage</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li v-for="objective in course.objectives" :key="objective">{{ objective }}</li>
          </ul>
  
          <!-- Leçons -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Leçons</h2>
          <div class="space-y-4">
            <div
              v-for="lesson in course.lessons"
              :key="lesson.id"
              class="p-4 bg-gray-50 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{{ lesson.title }}</h3>
                <p class="text-sm text-gray-600">{{ lesson.duration }} min</p>
              </div>
              <button
                class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                @click="startLesson(lesson)"
              >
                {{ lesson.completed ? "Revoir" : "Commencer" }}
              </button>
            </div>
          </div>
        </section>
  
        <!-- Section latérale -->
        <aside class="col-span-4 bg-white p-6 rounded shadow">
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Informations sur le cours</h2>
          <ul class="text-gray-700 space-y-2 mb-6">
            <li><strong>Durée totale :</strong> {{ course.totalDuration }} heures</li>
            <li><strong>Nombre de leçons :</strong> {{ course.lessons.length }}</li>
            <li><strong>Niveau :</strong> {{ course.level }}</li>
            <li><strong>Date d’ajout :</strong> {{ course.dateAdded }}</li>
          </ul>
  
          <!-- Ressources -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Ressources</h2>
          <ul class="text-blue-600 space-y-2">
            <li v-for="resource in course.resources" :key="resource.id">
              <a :href="resource.link" target="_blank" class="hover:underline">
                {{ resource.title }}
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        course: {
          title: "Manipulation du DOM avec JavaScript",
          category: "Développement Web",
          level: "Intermédiaire",
          description:
            "Ce cours vous apprendra à manipuler le DOM pour créer des sites interactifs et dynamiques grâce à JavaScript.",
          totalDuration: 5,
          dateAdded: "15 octobre 2024",
          objectives: [
            "Comprendre la structure du DOM.",
            "Sélectionner et manipuler les éléments HTML.",
            "Gérer les événements utilisateur.",
            "Créer des applications web interactives.",
          ],
          lessons: [
            { id: 1, title: "Introduction au DOM", duration: 15, completed: true },
            { id: 2, title: "Sélecteurs et manipulation de base", duration: 20, completed: false },
            { id: 3, title: "Gestion des événements", duration: 25, completed: false },
            { id: 4, title: "Création d’une application interactive", duration: 30, completed: false },
          ],
          resources: [
            { id: 1, title: "Documentation MDN sur le DOM", link: "https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model" },
            { id: 2, title: "Guide JavaScript avancé", link: "https://example.com/guide-js" },
          ],
        },
      };
    },
    methods: {
      startLesson(lesson) {
        alert(`Leçon sélectionnée : ${lesson.title}`);
        // Logique pour démarrer/reprendre une leçon
      },
    },
  };
  </script>
  