<script setup>
import headers from '../Helper/Header/index.vue'
import hero from './hero.vue';
import mostPopularCourses from './mostPopularCourses.vue';
import CoursesCertificats from './CoursesCertificats.vue';
import bestcategor from './bestcategor.vue'
import avancements from './avancements.vue';
import footers from '../Helper/Footer/index.vue'
</script>

<template>
    <div class="">
        <div class="mb-24">
            <headers />
        </div>
        <!--  -->
        <hero />
        <!--  -->
        <mostPopularCourses />
        <!--  -->
        <bestcategor/>
        <!--  -->
        <!-- <CoursesCertificats /> -->
        <!--  -->
        <avancements />
        <!--  -->
        <footers />
    </div>
</template>