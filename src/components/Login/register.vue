<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <!-- Carte d'inscription -->
      <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <!-- Titre -->
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">
          Inscription
          <span class="text-orange-400 underline"> </span>
        </h2>
  
        <!-- Formulaire -->
        <form @submit.prevent="handleRegister">
          <!-- Champ Nom -->
          <div class="mb-4">
            <input
              type="text"
              placeholder="Entrez votre nom"
              v-model="name"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          <!-- Champ Email -->
          <div class="mb-4">
            <input
              type="email"
              placeholder="Entrez votre email"
              v-model="email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          <!-- Champ Mot de passe -->
          <div class="mb-4">
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              v-model="password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          <!-- Confirmation Mot de passe -->
          <div class="mb-6">
            <input
              type="password"
              placeholder="Confirmer votre mot de passe"
              v-model="confirmPassword"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          <!-- Bouton Inscription -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>
  
        <!-- Liens supplémentaires -->
        <div class="text-center mt-4 text-sm text-gray-600">
          Vous avez déjà un compte ?
          <a href="#" class="text-blue-600 font-bold hover:underline">
            Connectez-vous
          </a>
        </div>
  
        <!-- Connexion avec Google et Facebook -->
        <div class="flex items-center justify-center mt-6">
          <button
            class="bg-white border rounded-full p-2 shadow-sm mr-4 hover:shadow-md transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              class="w-6 h-6"
            />
          </button>
          <button
            class="bg-white border rounded-full p-2 shadow-sm hover:shadow-md transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
              alt="Facebook"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
    methods: {
      handleRegister() {
        if (this.password !== this.confirmPassword) {
          alert("Les mots de passe ne correspondent pas !");
          return;
        }
        // Ajoute ici la logique d'inscription
        console.log("Nom:", this.name);
        console.log("Email:", this.email);
        console.log("Mot de passe:", this.password);
      },
    },
  };
  </script>
  
  <style>
  /* Styles additionnels si nécessaire */
  </style>
  