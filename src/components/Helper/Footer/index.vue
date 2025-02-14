<script setup>
import facebook from '../../../assets/icons/facebook.svg'
import youtube from '../../../assets/icons/youtube.svg'
import linkedin from '../../../assets/icons/linkelin.svg'
import instagram from '../../../assets/icons/instagram.svg'
import x from '../../../assets/icons/x.svg' 
import imgLogo from '../../../assets/images/img-logo.webp'
</script>
<template>
    <div class="bg-[#ffe8b8] py-24 px-6 sm:px-12 lg:px-24 text-[#6D737A] z-50">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-5">
            <!-- Colonne 1 -->
            <div class="md:col-span-2 lg:col-span-1 space-y-3">
                <div class="">
                    <img :src="imgLogo" class="w-auto h-16"  alt="">
                </div>
                <p class="md:pe-16">
                    Wisoria, apprenez à votre rythme grâce à nos vidéos pédagogiques organisées et nos contenus adaptés à vos besoins.
                </p>
            </div>

            <!-- Colonne 2 -->
            <div class="flex flex-col space-y-3">
                <p class="text-black text-xl font-semibold">Explorez</p>
                <router-link to="/">Accueil</router-link>
                <router-link to="/about">À propos</router-link>
                <router-link to="/courses">Cours</router-link>
                <router-link to="/contact">Contact</router-link>
            </div>

            <!-- Colonne 3 -->
            <div class="space-y-3">
                <p class="text-black text-xl font-semibold">Catégories</p>
                <p>Design UX/UI</p>
                <p>Développement web</p>
                <p>Marketing Digital</p>
                <p>Machine Learning</p>
            </div>

            <!-- Colonne 4 -->
            <div class="md:col-span-2 lg:col-span-1 space-y-3">
                <p class="text-black text-xl font-semibold">Contactez-nous</p>
                <p>Téléphone : +01 56 54 38 80</p>
                <p>Email: contact@wizoria.net</p>
                <div class="flex gap-3 items-center pt-3">
                    <button><img :src="facebook" alt="Facebook"></button>
                    <button><img :src="youtube" alt="YouTube"></button>
                    <button><img :src="linkedin" alt="LinkedIn"></button>
                    <button><img :src="instagram" alt="Instagram"></button>
                    <button><img :src="x" alt="X"></button>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-[#ffe8b8] border-t border-gray-300 py-4 px-6 sm:px-12 lg:px-24 text-[#6D737A] z-50">
        <p class="text-center">Copyright © 2025 Wisoria - Tous droits réservés.</p>
    </div>
</template>
