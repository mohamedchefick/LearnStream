<template>
    <div class="bg-gray-100 min-h-screen p-6">
      <!-- En-tête -->
      <header class="bg-[#FFE9BC] text-blue-700 p-6 rounded-lg shadow mb-6">
        <h1 class="text-3xl font-bold">Gestion du profil</h1>
        <p class="text-lg mt-2 text-black">Modifiez vos informations personnelles et vos paramètres de compte.</p>
      </header>
  
      <!-- Contenu principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Carte Profil -->
        <aside class="col-span-1 bg-white p-6 rounded-lg shadow">
          <div class="text-center">
            <!-- Image de profil -->
            <div class="relative mb-4">
              <img
                :src="user.avatar || '/images/default-avatar.png'"
                alt="Avatar"
                class="w-24 h-24 rounded-full mx-auto border-4 border-gray-200"
              />
              <button
                class="absolute bottom-0 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg"
                @click="updateAvatar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L12.586 4.586a2 2 0 102.828 2.828l2-2a2 2 0 000-2.828zM11.586 5.586l-6 6V14h2.414l6-6-2.414-2.414zM2 15.586V18h2.414l8.414-8.414-2.414-2.414L2 15.586z" />
                </svg>
              </button>
            </div>
            <h2 class="text-xl font-bold">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
        </aside>
  
        <!-- Formulaire de mise à jour -->
        <section class="col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-bold text-blue-700 mb-6">Informations personnelles</h2>
          <form @submit.prevent="updateProfile">
            <div class="grid grid-cols-2 gap-6 mb-6">
              <!-- Nom -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Nom</label>
                <input
                  type="text"
                  v-model="user.name"
                  class="w-full p-3 border-gray-300 rounded-lg focus:ring-blue-600"
                />
              </div>
              <!-- Email -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="w-full p-3 border-gray-300 rounded-lg focus:ring-blue-600"
                />
              </div>
            </div>
  
            <h2 class="text-2xl font-bold text-blue-700 mb-6">Changer le mot de passe</h2>
            <div class="grid grid-cols-1 gap-6 mb-6">
              <!-- Ancien mot de passe -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Mot de passe actuel</label>
                <input
                  type="password"
                  v-model="password.current"
                  class="w-full p-3 border-gray-300 rounded-lg focus:ring-blue-600"
                />
              </div>
              <!-- Nouveau mot de passe -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Nouveau mot de passe</label>
                <input
                  type="password"
                  v-model="password.new"
                  class="w-full p-3 border-gray-300 rounded-lg focus:ring-blue-600"
                />
              </div>
              <!-- Confirmation du mot de passe -->
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Confirmez le nouveau mot de passe</label>
                <input
                  type="password"
                  v-model="password.confirm"
                  class="w-full p-3 border-gray-300 rounded-lg focus:ring-blue-600"
                />
              </div>
            </div>
  
            <!-- Bouton de soumission -->
            <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Enregistrer les modifications
            </button>
          </form>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: "John Doe",
          email: "johndoe@example.com",
          avatar: null,
        },
        password: {
          current: "",
          new: "",
          confirm: "",
        },
      };
    },
    methods: {
      updateProfile() {
        // Logique pour envoyer les données mises à jour au backend
        alert("Profil mis à jour avec succès !");
      },
      updateAvatar() {
        // Logique pour mettre à jour l'image de profil
        alert("Ouvrir le sélecteur d'image !");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajout de styles pour améliorer le design */
  </style>
  