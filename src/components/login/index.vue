<script>
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import { apiRequest } from '../../utils/api'; // Assurez-vous que le chemin est correct

export default {
    data() {
        return {
            email: "",
            password: "",
            iconDecouvrir,
            loading: false, // Ajout d'un état de chargement
        };
    },
    methods: {
        async handleLogin() {
            this.loading = true; // Mettre le chargement à vrai
            try {
                const response = await apiRequest({
                    method: 'POST',
                    url: 'users/login/',
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                });

                if (response.status !== 200) {
                    alert("Échec de la connexion. Veuillez vérifier vos identifiants."); // Remplacez par un Toast si nécessaire
                    throw new Error("Échec de la connexion. Veuillez vérifier vos identifiants.");
                }

                const data = response.data; // Récupération des données
                // Stocker les tokens et les données utilisateur dans localStorage
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('userData', JSON.stringify(data.user));

                alert(`Bienvenue ${data.user.first_name}!`); // Remplacez par un Toast si nécessaire
                this.$router.push({ name: 'Home' }); // Navigation vers la page d'accueil
            } catch (error) {
                if (error.response && error.response.data.non_field_errors) {
                    for (const message of error.response.data.non_field_errors) {
                        alert(message); // Remplacez par un Toast si nécessaire
                    }
                }
            } finally {
                this.loading = false; // Mettre le chargement à faux
            }
        },
    },
};
</script>

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
  
  <style>
  /* Ajoute ici les styles globaux si nécessaires */
  </style>