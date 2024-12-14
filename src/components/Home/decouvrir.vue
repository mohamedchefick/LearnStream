<template>

</template>

<script setup>
import star from '../../assets/icons/star.svg'
import profil from '../../assets/icons/profil.svg'
import iconDecouvrir from '../../assets/icons/decouvrir.svg'
import imgDecouvrir1 from '../../assets/images/img-decouvert1.webp'
import imgDecouvrir2 from '../../assets/images/img-decouvert2.webp'
import imgDecouvrir3 from '../../assets/images/img-decouvert3.webp'
import imgDecouvrir4 from '../../assets/images/img-decouvert4.webp'

const courses = [
    {
        img: imgDecouvrir1,
        title: 'Développement web',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir2,
        title: 'Design UX/UI',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir3,
        title: 'Marketing digital',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir4,
        title: 'Applications mobiles ',
        author: 'John Doe',
        rating: 5.00,
        reviews: 5,
    },
]
</script>
<template>
    <div class="min-h-screen text-center py-10 px-6 sm:px-12 lg:px-24 bg-[#F5F5F5]">
        <div class="text-[#0056D2] text-xl sm:text-2xl font-bold">
            Découvrez nos vidéos les plus populaires
            <div class="flex justify-center mx-auto mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/5" alt="">
            </div>
        </div>
        <div class="text-[#6F6B6B] text-sm w-full sm:w-3/4 lg:w-2/5 mx-auto mt-6 sm:mt-10">
            Une sélection de nos meilleures vidéos uniquement pour vous. Que vous soyez passionné de développement, design ou intelligence artificielle, ces contenus incontournables vous aideront à enrichir vos compétences et à rester à la pointe des dernières tendances.
        </div>
        <!--  -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-14 py-10">
            <div 
                v-for="(item, index) in courses" 
                :key="index" 
                class="bg-white rounded-3xl p-2 hover:-translate-x-1 hover:-translate-y-1 duration-200 shadow-lg"
            >
                <img :src="item.img" class="w-full rounded-t-3xl" alt="">
                <div class="py-4 flex items-center justify-between bg-white rounded-b-3xl px-4">
                    <div class="flex gap-2 items-center">
                        <img v-for="i in 5" :key="i" :src="star" class="w-5" alt="">
                    </div>
                    <div>
                        {{ item.rating }} <span class="text-[#8E8888]">({{ item.reviews }})</span>
                    </div>
                </div>
                <div class="px-4">
                    <h1 class="py-4 text-start text-base font-semibold">{{ item.title }}</h1>
                    <div class="flex gap-4 items-center">
                        <img :src="profil" class="w-8 h-8 rounded-full" alt="">
                        <h1>Par <span class="font-bold">{{ item.author }}</span></h1>
                    </div>
                </div>
                <div class="py-4">
                    <button class="text-[#FFA600] hover:text-white px-5 py-2 hover:bg-[#FFA600] border-[#FFA600] border-2 rounded-full duration-200 font-bold">
                        Accéder à ce cours
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

</script>

<style scoped>
</style>
