<script setup>
import anato from '../../assets/icons/anato.svg'
import jojo from '../../assets/icons/jojo.svg'
import benon from '../../assets/icons/benon.svg'
import chidas from '../../assets/icons/chidas.svg'
import dollard from '../../assets/icons/dollard.svg'
import koudenoukpo from '../../assets/icons/koudenoukpo.svg'

const teamMembers = [
    { name: "CHIDAS", role: "Développeur/Designer", image: chidas },
    { name: "BENON", role: "Designer", image: benon },
    { name: "ANATO", role: "Développeur", image: anato },
    { name: "JOJO", role: "Développeur", image: jojo },
    { name: "HOUNKPE", role: "Développeur", image: dollard },
    { name: "KOUDENOUKPO", role: "Développeur", image: koudenoukpo },
];

</script>

<template>
    <div class="bg-[#FFA600] w-2/3 mx-auto text-center rounded-3xl p-5 space-y-6 mb-20 py-14 hidden md:flex ">
        <div class="space-y-4">
            <div class="font-bold text-3xl text-[#0056D2]">Rejoignez-nous</div>
            <div class="font-semibold text-xl">Prêt(e) à transformer votre apprentissage ? Rejoignez notre team</div>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
        <div v-for="(member, index) in teamMembers" :key="index" class="text-center ">
            <img :src="member.image" alt="" class="w-24 h-24 object-cover rounded-full mx-auto">
            <div class="font-bold mt-2">{{ member.name }}</div>
            <div class="text-gray-600">{{ member.role }}</div>
        </div>
    </div>
    </div>
    <div class="bg-[#FFA600] text-center rounded-3xl mx-3 p-3 mb-10">
    <div class="space-y-4">
        <div class="font-bold text-3xl text-[#0056D2]">Rejoignez-nous</div>
        <div class="font-semibold text-xl">Prêt(e) à transformer votre apprentissage ? Rejoignez notre team</div>
    </div>
    <div class="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
        <div v-for="(member, index) in teamMembers" :key="index" class="text-center flex-shrink-0 w-32">
            <img :src="member.image" alt="" class="w-24 h-24 object-cover rounded-full mx-auto">
            <div class="font-bold mt-2">{{ member.name }}</div>
            <div class="text-gray-600">{{ member.role }}</div>
        </div>
    </div>
</div>

</template>