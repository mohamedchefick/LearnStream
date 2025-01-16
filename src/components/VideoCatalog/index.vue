<script setup>
import headers from '../Helper/Header/index.vue'
import hero from './hero.vue';
import mostPopularCourses from './mostPopularCourses.vue';
import CoursesCertificats from './CoursesCertificats.vue';
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
        <CoursesCertificats />
    </div>
</template>