
<script setup>
import iconDecouvrir from '../../assets/icons/decouvrir.svg';
import imgDecouver from '../../assets/images/img-categorie2.webp';
import iconLina from '../../assets/icons/iconLina.svg';
import iconLevel from '../../assets/icons/iconLevel.svg';

const popularCourses = [
    {
        image: imgDecouver,
        title: 'Faites vos premiers pas sur VsCode',
        authorIcon: iconLina,
        authorName: 'Lina',
        levelIcon: iconLevel,
        progress: 'Cours 3 sur 4',
    },
    {
        image: imgDecouver,
        title: 'Découvrez les bases de React.js',
        authorIcon: iconLina,
        authorName: 'Alex',
        levelIcon: iconLevel,
        progress: 'Cours 2 sur 5',
    },
    {
        image: imgDecouver,
        title: 'Apprenez à coder en Python',
        authorIcon: iconLina,
        authorName: 'Marie',
        levelIcon: iconLevel,
        progress: 'Cours 1 sur 3',
    },
];
</script>

<template>
    <div class="bg-[#EFE6D4] lg:h-screen px-6 sm:px-12 lg:px-24 py-10">
        <!-- Title Section -->
        <div class="text-[#0056D2] text-xl sm:text-3xl font-bold xl:w-2/5">
            Les cours les plus populaires
            <div class="flex xl:justify-end lg:me-20 mt-4">
                <img :src="iconDecouvrir" class="w-1/2 sm:w-1/4 lg:w-1/3" alt="">
            </div>
        </div>

        <!-- Courses Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div 
                v-for="(course, index) in popularCourses" 
                :key="index" 
                class="bg-white p-4 rounded-3xl shadow-lg"
            >
                <img :src="course.image" class="rounded-t-3xl" alt="">
                <div class="space-y-3 mt-3 p-3">
                    <div class="text-[#252641] text-2xl font-semibold">{{ course.title }}</div>
                    <div class="flex gap-3 items-center text-lg font-medium">
                        <img :src="course.authorIcon" class="w-6 h-6" alt="">
                        {{ course.authorName }}
                    </div>  
                    <div>
                        <img :src="course.levelIcon" alt="">
                    </div> 
                    <div class="text-end text-[#00000080] text-sm mb-3 font-semibold">{{ course.progress }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
