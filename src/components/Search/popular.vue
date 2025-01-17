<script setup>
import imgDecouvrir1 from '../../assets/images/img-htmlcss.webp'
import imgDecouvrir2 from '../../assets/images/img-thiking.webp'
import imgDecouvrir3 from '../../assets/images/img-javascript.webp'
import imgDecouvrir4 from '../../assets/images/img-figma.webp'
import star from '../../assets/icons/star.svg'


const courses = [
    {
        img: imgDecouvrir1,
        title: 'Concevez vos sites avec HTML5 et CSS3',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir2,
        title: 'Initiez-vous au Design Thinking',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir3,
        title: 'Apprenez à coder avec Javascript',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir1,
        title: 'Faites vos premiers pas avec Figma',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir2,
        title: 'Concevez vos sites avec HTML5 et CSS3',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir2,
        title: 'Initiez-vous au Design Thinking',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir3,
        title: 'Apprenez à coder avec Javascript',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir4,
        title: 'Faites vos premiers pas avec Figma',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir1,
        title: 'Concevez vos sites avec HTML5 et CSS3',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir2,
        title: 'Initiez-vous au Design Thinking',
        rating: 5.00,
        reviews: 5,

    },
    {
        img: imgDecouvrir3,
        title: 'Apprenez à coder avec Javascript',
        rating: 5.00,
        reviews: 5,
    },
    {
        img: imgDecouvrir4,
        title: 'Faites vos premiers pas avec Figma',
        rating: 5.00,
        reviews: 5,
    },
    
]
</script>

<template>
    <div class=" py-10 px-6 sm:px-12 lg:px-24 xl:px-28">
        <div class="flex justify-between items-center text-base font-semibold">
            <div class="flex gap-20 items-center">
                <div class="text-[#0056D2] px-3 py-1 rounded border border-[#0056D2] text-base">Populaires</div>
                <div class="flex gap-5 text-white">
                    <button class="bg-[#F4A002CC] px-3 py-1 rounded-md">Tout</button>
                    <button class="bg-[#F4A002CC] px-3 py-1 rounded-md">Design</button>
                    <button class="bg-[#F4A002CC] px-3 py-1 rounded-md">Marketing</button>
                    <button class="bg-[#F4A002CC] px-3 py-1 rounded-md">Business</button>
                </div>
            </div>
            <div class="">
                <button class="text-[#0056D2] px-3 py-1 rounded border border-[#0056D2] text-base">Filtrer</button>
            </div>
        </div>
                <!--  -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-14 py-10">
            <div 
                v-for="(item, index) in courses" 
                :key="index" 
                class="bg-white rounded-3xl shadow-2xl hover:-translate-x-1 hover:-translate-y-1 duration-200 p-1"
            >
                <img :src="item.img" class="w-full" alt="">
                <div class="py-4 flex items-center justify-between bg-white rounded-t-full px-4">
                    <div class="flex gap-2 items-center">
                        <img v-for="i in 5" :key="i" :src="star" class="w-5" alt="">
                    </div>
                    <div>
                        {{ item.rating }} <span class="text-[#8E8888]">({{ item.reviews }})</span>
                    </div>
                </div>
                <div class="px-4">
                    <h1 class="py-4 text-start text-base font-semibold">{{ item.title }}</h1>
                </div>
                <div class="p-4 flex justify-center">
                    Lorem ipsum dolor sit amet, consecteteur adipising elit.
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</template>