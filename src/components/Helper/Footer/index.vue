<script setup>
import facebook from '../../../assets/icons/facebook.svg'
import youtube from '../../../assets/icons/youtube.svg'
import linkedin from '../../../assets/icons/linkelin.svg'
import instagram from '../../../assets/icons/instagram.svg'
import x from '../../../assets/icons/x.svg' 
</script>
<template>
    <div class="bg-[#ffc65564] py-24 px-6 sm:px-12 lg:px-24 text-[#6D737A]">
        <div class="flex flex-wrap xl:flex-nowrap justify-between gap-10 lg:gap-5">
            <!-- Colonne 1 -->
            <div class="w-full sm:w-1/2 lg:w-1/4 space-y-3">
                <h1 class="bg-[#FFA600] font-extrabold px-6 py-3 text-white rounded-full inline-block">Logo</h1>
                <h1 class="text-black text-xl font-semibold">Contactez-nous</h1>
                <h1>Téléphone : +123 400 123</h1>
                <h1>Praesent nulla massa, hendrerit vestibulum gravida in, feugiat auctor felis.</h1>
                <h1 class="text-black">Email: example@mail.com</h1>
                <div class="flex gap-3 items-center">
                    <button><img :src="facebook" alt="Facebook"></button>
                    <button><img :src="youtube" alt="YouTube"></button>
                    <button><img :src="linkedin" alt="LinkedIn"></button>
                    <button><img :src="instagram" alt="Instagram"></button>
                    <button><img :src="x" alt="X"></button>
                </div>
            </div>

            <!-- Colonne 2 -->
            <div class="w-full sm:w-1/2 lg:w-1/4 space-y-3">
                <h1 class="text-black text-xl font-semibold">Explorez</h1>
                <h1>Accueil</h1>
                <h1>À propos</h1>
                <h1>Vidéos</h1>
                <h1>Quiz</h1>
                <h1>Certifications</h1>
                <h1>Forum</h1>
            </div>

            <!-- Colonne 3 -->
            <div class="w-full sm:w-1/2 lg:w-1/4 space-y-3">
                <h1 class="text-black text-xl font-semibold">Catégories</h1>
                <h1>Design UX/UI</h1>
                <h1>Développement web</h1>
                <h1>Marketing Digital</h1>
                <h1>Data Science</h1>
                <h1>Machine Learning</h1>
                <h1>Agile</h1>
                <h1>Cloud Computing</h1>
            </div>

            <!-- Colonne 4 -->
            <div class="w-full sm:w-1/2 lg:w-1/4 space-y-3">
                <h1 class="text-black text-xl font-semibold">Inscrivez-vous</h1>
                <h1>Lorem Ipsum has been them an industry printer took a galley make book.</h1>
                <input 
                    type="text" 
                    class="w-full border-[#6676DE] border h-14 rounded-2xl px-3" 
                    placeholder="Votre Email"
                >
                <div>
                    <button 
                        class="bg-[#0056D2] py-3 px-6 rounded-xl text-sm lg:text-base text-white 
                               hover:bg-[#003F9A] hover:scale-105 transition-transform duration-300"
                    >
                        S’inscrire maintenant
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
