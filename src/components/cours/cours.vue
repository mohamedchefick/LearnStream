<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <!-- En-tête -->
      <header class="bg-[#FFE9BC] text-blue-700 p-6 rounded-lg shadow mb-6">
        <h1 class="text-3xl font-bold">{{ lesson.title }}</h1>
        <p class="text-lg mt-2 text-black">Durée : {{ lesson.duration }} min • Niveau : {{ lesson.level }}</p>
        <p class="mt-4 text-black">{{ lesson.description }}</p>
      </header>
  
      <!-- Contenu principal -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Section principale -->
        <section class="col-span-8 bg-white p-6 rounded shadow">
          <!-- Vidéo de la leçon -->
          <div class="mb-6">
            <video
              class="w-full rounded-lg shadow-lg h-80"
              controls
              :src="lesson.video"
              :poster="Img4"
            ></video>
          </div>
  
          <!-- Contenu de la leçon -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Résumé de la leçon</h2>
          <p class="text-gray-700 mb-6">{{ lesson.content }}</p>
  
          <!-- Section commentaires -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Commentaires</h2>
          <div class="space-y-4">
            <!-- Formulaire de commentaire -->
            <form @submit.prevent="addComment" class="mb-6">
              <textarea
                v-model="newComment"
                placeholder="Laissez un commentaire..."
                class="w-full p-4 rounded border-gray-300 focus:ring-blue-600"
                rows="3"
              ></textarea>
              <button
                type="submit"
                class="mt-2 bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
              >
                Publier
              </button>
            </form>
  
            <!-- Liste des commentaires -->
            <div v-for="comment in lesson.comments" :key="comment.id" class="p-4 bg-gray-50 rounded shadow-sm">
              <p class="text-gray-800 font-semibold">{{ comment.author }}</p>
              <p class="text-gray-600 text-sm">{{ comment.date }}</p>
              <p class="mt-2 text-gray-700">{{ comment.text }}</p>
            </div>
          </div>
        </section>
  
        <!-- Section latérale -->
        <aside class="col-span-4 bg-white p-6 rounded shadow">
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Ressources associées</h2>
          <ul class="text-blue-600 space-y-2 mb-6">
            <li v-for="resource in lesson.resources" :key="resource.id">
              <a :href="resource.link" target="_blank" class="hover:underline">
                {{ resource.title }}
              </a>
            </li>
          </ul>
  
          <!-- Navigation des leçons -->
          <h2 class="text-2xl font-bold text-blue-700 mb-4">Leçons suivantes</h2>
          <ul class="space-y-4">
            <li
              v-for="nextLesson in lesson.nextLessons"
              :key="nextLesson.id"
              class="p-4 bg-gray-50 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{{ nextLesson.title }}</h3>
                <p class="text-sm text-gray-600">{{ nextLesson.duration }} min</p>
              </div>
              <button
                class="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                @click="navigateToLesson(nextLesson.id)"
              >
                Suivre
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </template>
  
  <script>
  import Img4 from '../../assets/images/img-student.webp';
  export default {
    data() {
      return {
        Img4,
        lesson: {
          title: "Introduction au DOM",
          duration: 15,
          level: "Intermédiaire",
          description: "Cette leçon introduit les bases de la manipulation du DOM avec JavaScript.",
          video: "/videos/dom-intro.mp4",
          content: `
            Apprenez les bases de la manipulation du DOM pour créer des applications web interactives. 
            Découvrez comment sélectionner, modifier, et ajouter des éléments à la page en utilisant JavaScript.
          `,
          resources: [
            { id: 1, title: "Documentation MDN sur le DOM", link: "https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model" },
            { id: 2, title: "Tutoriel DOM avancé", link: "https://example.com/advanced-dom-tutorial" },
          ],
          comments: [
            { id: 1, author: "Alice", date: "18 déc. 2024", text: "Cette leçon est super claire, merci !" },
            { id: 2, author: "Bob", date: "19 déc. 2024", text: "Je comprends mieux les événements maintenant, merci." },
          ],
          nextLessons: [
            { id: 2, title: "Sélecteurs et manipulation de base", duration: 20 },
            { id: 3, title: "Gestion des événements", duration: 25 },
          ],
        },
        newComment: "",
      };
    },
    methods: {
      addComment() {
        if (this.newComment.trim()) {
          this.lesson.comments.push({
            id: Date.now(),
            author: "Vous",
            date: new Date().toLocaleDateString("fr-FR"),
            text: this.newComment.trim(),
          });
          this.newComment = "";
        }
      },
      navigateToLesson(lessonId) {
        alert(`Navigation vers la leçon avec l'ID ${lessonId}`);
        // Logique pour naviguer vers une nouvelle leçon
      },
    },
  };
  </script>
  