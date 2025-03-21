<script setup>
import anato from '../../assets/images/teams/ANATO.png'
import jojo from '../../assets/images/teams/JOJO.png'
import benon from '../../assets/images/teams/BENON.png'
import koudenoukpo from '../../assets/images/teams/MH.png'

// Image anonyme par défaut
const anonymousAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

const teamMembers = [
    { name: "ALLAGBE JOSAPHAT", role: "Développeur Frontend", image: jojo },
    { name: "ANATO DAVID", role: "Développeur Fullstack\nGestionnaire de projet", image: anato },
    { name: "BENON MOURCHEDATH", role: "Designer", image: benon },
    { name: "CHIDAS LEA", role: "Développeur Frontend\nDesigner", image: anonymousAvatar },
    { name: "HOUNKPE DOLLARD", role: "Développeur Frontend", image: anonymousAvatar },
    { name: "KOUDENOUKPO CHEFICK", role: "Développeur Frontend", image: koudenoukpo },
];

</script>

<template>
    <div class="px-6 md:px-10 lg:px-20 py-10">
        <div class="bg-[#FFA600] rounded-3xl p-8 max-w-8xl mx-auto">
            <div class="text-center mb-10">
                <h2 class="font-bold text-3xl md:text-4xl text-[#fff] mb-4">Notre équipe</h2>
                <p class="font-semibold text-xl md:text-2xl">Découvrez les talents qui font vivre la plateforme</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
                <div v-for="(member, index) in teamMembers" :key="index" class="text-center w-full max-w-xs">
                    <div class="w-28 h-28 mx-auto rounded-full bg-white flex items-center justify-center">
                        <img :src="member.image" :alt="member.name" class="w-24 h-24 object-cover rounded-full shadow-lg">
                    </div>
                    <div class="mt-3">
                        <h3 class="font-bold text-lg">{{ member.name }}</h3>
                        <p class="text-gray-700 text-sm whitespace-pre-line">{{ member.role }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>