<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <!-- Carte de connexion -->
      <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <!-- Titre -->
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">
          Connexion
          <div class="ms-20 w-1/3">
            <img :src="iconDecouvrir" class="w-full mt-0 ms-20" alt="">
          </div>
          <!-- <span class="text-orange-400 underline"> </span> -->
        </h2>
        <!-- Formulaire -->
        <form @submit.prevent="handleLogin">
          <div class="mb-10 mt-9">
            <input
              type="email"
              placeholder="Entrez votre email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 "
              v-model="email"
              required
            />
          </div>
          <div class="mb-6">
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              v-model="password"
              required
            />
          </div>
          <!-- Bouton de connexion -->
           <div class="flex justify-center mt-10">
               <button
                 type="submit"
                 class="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition duration-200"
               >
                 Se connecter
               </button>
           </div>
        </form>
        <!-- Liens supplémentaires -->
        <div class="text-center mt-4 text-sm text-gray-600 mt-6">
          <a href="#" class="text-blue-500 hover:underline">Mot de passe oublié</a>
        </div>
        <div class="text-center mt-2 text-sm">
          Pas encore de compte ?
          <a href="/inscription" class="text-blue-600 font-bold hover:underline">
            Inscrivez-vous
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
import iconDecouvrir from '../../assets/icons/decouvrir.svg';

export default {
    data() {
        return {
        email: "",
        password: "",
        iconDecouvrir,
        };
    },
    methods: {
        handleLogin() {
        // Ajoute ici la logique d'authentification
        console.log("Email:", this.email);
        console.log("Password:", this.password);
        },
    },
};
</script>
  
  <style>
  /* Ajoute ici les styles globaux si nécessaires */
  </style>
  