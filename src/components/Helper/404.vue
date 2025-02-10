<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <!-- Text Content -->
        <div class="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center space-y-8 text-center md:text-left">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold text-blue-700 max-w-xl">
              Oups ! Cette page est introuvable.
            </h1>
      
            <p class="text-lg sm:text-xl text-gray-600 max-w-lg">
                Il semble que la page que vous cherchez n'existe pas ou a été déplacée.
            </p>

            <div class="mt-8">
                <router-link to="/" class="inline-block">
                  <button
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition duration-300 ease-in-out text-base sm:text-lg shadow-lg hover:shadow-xl"
                  >
                    Retourner à l'accueil
                  </button>
                </router-link>
            </div>
        </div>

        <!-- Illustration -->
        <div class="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
            <img 
              src="../../assets/images/img_404.png" 
              alt="Page Non Trouvée" 
              class="w-full max-w-lg object-contain transform scale-125 sm:scale-150" 
            />
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  name: 'PageNoFound',
};
</script>
  
<style scoped>
/* Add any specific styles here if needed */
</style>